import { Profile } from './profile.model';

export interface User {
   id: number;
   name: string;
   lastname: string;
   email: string;
   password: string;
   phone: string;
   disabled: boolean;
   profile_id: number;
   profile: Profile;
}