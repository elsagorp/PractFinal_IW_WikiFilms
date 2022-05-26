import {gql} from "@apollo/client";


export const SIGN_IN = gql`

  mutation SignIn($email: String!, $pwd: String!) {
    SignIn(email: $email, pwd: $pwd){
      _id
      email

    }
}
`;

export const LOGIN = gql`

mutation LogIn($email: String!, $pwd: String!) {
  LogIn(email: $email, pwd: $pwd)
}
`;

export const LOGOUT = gql`

  mutation LogOut {
    LogOut

}
`;

export const ADD_FILM = gql`

mutation AddFilm ($name: String!, $description: String!) {
  AddFilm(name: $name, description: $description)
}
`;


export const DELETE_FILM = gql`

  mutation DeleteFilm($id: ID!) {
    DeleteFilm(id: $id)
  }
`;


export const UPDATE_FILM = gql`

  mutation UpdateFilm($id: ID!,$name: String, $description: String) {
    UpdateFilm(id: $id, name: $name, description: $description)
  }
`;

export const GET_FILMS = gql`

query GetFilms {
  getFilms {
    _id
    name
    description
    author
  }
}
`;

export const GETUSER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      token
      email
    }
  }
`;