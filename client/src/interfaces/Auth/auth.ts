export interface Login {
    email: string;
    password: string;
}

export interface Register {
    username: string;
    email: string;
    password: string;
}


export interface User {
    id: number
    username: string
    email: string
    password: string
    role: string
}