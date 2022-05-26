export interface User {
    _id?: string,
    email: string,
    password: string,
    films: [string]
}

export type Film ={
    _id: string;
    name: string;
    description: string;
    author: string;
    
}