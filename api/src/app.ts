import { ApolloServer, ApolloError} from 'apollo-server';
import { connectDB} from './mongo';
import { Mutation } from './resolvers/Mutation';
import { Query } from './resolvers/Query';

import { typeDefs } from './Schema';


// Film, 
// User

const resolvers = {
  Query,
  Mutation,

}

const run = async() => {
 

  const db = await connectDB();


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async({req, res}) => {
     // const valid = [ "AddFilm","UpdateFilm", "DeleteFilm", "LogOut", "getFilms"];
      const header = req.headers.authorization ;// req.headers['token']; 
      const user = await db.collection("Usuarios").findOne({token: header});
      return{
        db,
        user
      };

    } ,
  });
((
  await server.listen().then(({url}) =>{
    console.log(`Server start at ${url}`);
  })));

} ;

try {
  run();
} catch (e) {
  console.error(e);
}

