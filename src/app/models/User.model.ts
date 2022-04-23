import { Role } from "./Role.model";

export class User {
    id: number = 0;
    userName: string = '';
    firstName: string = '';
    lastName: string = '';
    password: string = '';
    role: Role = Role.USER;
    token?: string;
    isLoggedIn: boolean = false;
}