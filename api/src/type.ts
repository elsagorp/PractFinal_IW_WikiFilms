import { Db } from "mongodb";





export type FilmMongo = {
    _id: string;
    name: string;
    description: string;
    author: string;
}


export interface IContext {
  db: Db;
  user: UserMongo;
}

export type UserMongo = {
    _id: string,
    email: string,
    pwd: string,
    token: string,
}