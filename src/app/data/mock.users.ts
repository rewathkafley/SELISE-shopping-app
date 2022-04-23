import { Role } from "../models/Role.model";

export const USERS = [
    {
        id: 1,
        userName: 'user',
        firstName: 'Rahim',
        lastName: 'Uddin',
        password: 'user',
        role: Role.USER,
        token: '',
        isLoggedIn: false
    },
    {
        id: 2,
        userName: 'admin',
        firstName: 'Super',
        lastName: 'Admin',
        password: 'admin',
        role: Role.ADMIN,
        token: '',
        isLoggedIn: false
    },
    {
        id: 3,
        userName: 'user2',
        firstName: 'Karim',
        lastName: 'Uddin',
        password: 'user2',
        role: Role.USER,
        token: '',
        isLoggedIn: false
    }
]