import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertService } from './../shared/alert.service';
import { User } from './../models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

@Component({
   selector: 'login',
   templateUrl: 'login.html'
})

export class LoginComponent implements OnInit, OnDestroy {
   form: FormGroup;
   
   constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private alertService: AlertService
   ) { }
   
   /** init component */
   ngOnInit() { 
      $('#page-top').addClass('bg-gradient-primary');
      this.createForm();
   }

   /** destroy component */
   ngOnDestroy() { 
      $('#page-top').removeClass('bg-gradient-primary');
   }

   /** create login form */
   createForm() {
      this.form = this.fb.group({
         email: ['', Validators.compose([
            Validators.required,
            Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/im)
         ])],
         password: ['', Validators.compose([
            Validators.required,
         ])]
      });
   }

   /** buttom login */
   login(credentials: any) {
      if (this.form.valid) {
         this.authService.login(credentials).subscribe(
            (data) => {
               console.log(data);
            },
            (error) => {
               debugger
               this.alertService.showMessageServer(error);
            }
         );
      } else {
         this.alertService.showMessage('Formulario', 'Los campos son requeridos', 'error');
      }
   }

}