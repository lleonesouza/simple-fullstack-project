export enum Actions {
    ADD_USER = 'ADD_USER',
    REMOVE_USER = 'REMOVE_USER',
    UPDATE_USER = 'UPDATE_USER',
    LIST_USERS = 'LIST_USERS',
}

export interface CreateUserInput  {
    name: string;
    age: number;
    email: string;
    avatar: string;
}

export interface UpdateUserInput  {
    name?: string;
    age?: number;
    email?: string;
    avatar?: string;
}

export interface User  {
    _id: string;
    name: string;
    age: number;
    email: string;
    avatar: string;
    __v: number;
}


export interface UsersState {
    users: User[];
}

export interface ActionMethods {
    ADD_USER: (data: CreateUserInput) => Promise<void>;
    REMOVE_USER: (id: string) => Promise<void>;
    LIST_USERS: () => Promise<void>;
    UPDATE_USER: (id: string, data: UpdateUserInput) => Promise<void>;
}