import { gql } from "apollo-server";

const typeDefs = gql`


type Film{
  _id: ID!
  name: String!
  description: String!
  author: String!
}

type User{
  _id: ID!
  email: String!
  token: String
}


input FilmInput{
  name: String
  description: String!

}

  type Query {

    getFilms: [Film]
    getUser(id: ID!): User
  
  }
  type Mutation {
    SignIn(email: String!, pwd:String!): User!

    LogIn(email: String!, pwd:String!): String!
    LogOut: Boolean!


    AddFilm(name: String!, description: String!): String!
    UpdateFilm(id: ID!,name: String, description: String): String!
    DeleteFilm(id: ID!): String!

  }
`;

export { typeDefs };

//(email: String!, pwd:String!, token: String!)
//    SignOut(email: String!, pwd:String!): String