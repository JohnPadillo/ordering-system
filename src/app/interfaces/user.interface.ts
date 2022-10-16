import { User } from "@angular/fire/auth";

export interface AuthUser extends User {
    isAdmin: boolean
}