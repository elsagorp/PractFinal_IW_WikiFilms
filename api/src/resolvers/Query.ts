import { Db, ObjectId } from "mongodb";
import { ApolloError} from "apollo-server";

  import { IContext, FilmMongo } from "../type";
 
  

  
  interface IGetUser {
    id: string;
  }

  


  

  
  const Query = {

    getFilms: async (parent: any, args:any, ctx: IContext) => {

      const {db, user} = ctx;
      // if(!user) throw new ApolloError("Unauthorized", "404");
      if(user){
    
        const filmsCollection  = await db.collection("Peliculas");
        const films = await filmsCollection.find({author: user.email}).toArray();
        return films;
      }else{
        throw new ApolloError("Unauthorized", "404");
      }
        
        
    },
  
    getUser: async (
      parent: any,
      args: IGetUser,
      ctx: IContext
    ) => {
      
        const db: Db = ctx.db;
        const users = db.collection("Usuarios");
        const user = await users.findOne({ "_id": new ObjectId(args.id) });
        
        if (user) {
          
          return{
            ...user,
            id: user["_id"].toString()
          }
        }else{
          throw new ApolloError("Out of bonds", "404");
        }
     
    },
  

  };

       
  
  export {Query}
//  export const Film = {
//     author:async(parent: {author: string}, args: any,ctx: IContext) =>{
//       const auth = await ctx.db.collection("Usuarios").findOne({email: parent.author});
//       return auth;


//     }
//   }



  
//   export const User = {
//    films: async(parent:  {email: string}, args: any, ctx: IContext) =>{
//      const filmss = await ctx.db.collection("Peliculas").find({author: parent.email}).toArray();

//      return filmss;

      
//     }
//   }