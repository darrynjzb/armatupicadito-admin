'use strict';

const bcrypt = require('bcrypt');
const response = require('../shared/response');
const services = require('../services/index');

/**
 * login a sistema
 * @param {*} req [request recibidos por http]
 * @param {*} res [response respuesta http]
 */
function login(req, res) {

   try {

      const params = req.body;

      if (!params.email || !params.password) {
         return response.error(res, 'Faltan datos por completar', 500);
      }   

      const User = services.UserService.getUserByEmail(params.email);

      User.then(
         (userData) => {

            if (userData) {

               /** se valida que no este deshabilitado el usuario */
               if (!userData.enabled) {
                  return response.error(res, 'El usuario está deshabilitado', 401);
               }

               const hash = userData.password;
               const password = params.password;

               bcrypt.compare(password, hash).then(
                  (dataPassword) => {

                     if (dataPassword) {

                        const generatedToken = services.JwtService.generateToken(userData);  

                        const userLogged = {
                           name: userData.name,
                           lastname: userData.lastname,
                           email: userData.email,
                           phone: userData.phone,
                           profile: userData.profile,
                           enabled: userData.enabled,
                           token: generatedToken
                        };

                        return response.success(res, userLogged);

                     } 

                     return response.error(res, 'Password incorrecto', 500);
                     
                  }

               ).catch(
                  (exception) => { 
                     return response.error(res, exception.message, 500); 
                  }
               );

            } else {
               return response.error(res, 'Credenciales incorrectas', 500);
            }

         }
      ).catch(
         (exception) => { 
            return response.error(res, exception.message, 500); 
         }
      );
      
   } catch (exception) {
      console.log(`Error en login ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { 
   login
};
