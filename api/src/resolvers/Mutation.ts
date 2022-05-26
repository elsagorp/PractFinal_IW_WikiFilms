import { Db, ObjectId } from "mongodb";
import { ApolloError} from "apollo-server";
import { IContext, FilmMongo,UserMongo} from "../type";
import bcrypt from"bcryptjs";





interface IUpdateFilmArgs {
  film:{
    name: string;
    description: string;
  },
  id: string
    

}

interface IDeleteFilmArgs {
  id: string;
  
}



const salt = 10;
const Mutation = {

  AddFilm: async (parent: any, args: any, ctx: IContext ) => {
   //  try{
      const {db, user} = ctx;


      if(user){
        const filmsCollection  = await db.collection("Peliculas");

        const found = await filmsCollection.findOne({ name: args.name, author: ctx.user.email });
  
        if (found) throw new ApolloError("Film already in DB", "403");
        if (args){

           const {insertedId} =  await filmsCollection.insertOne({name: args.name, description: args.description, author: ctx.user.email});
  
            return `Film added with id:  ${insertedId}`;
        }
      }else{
        throw new ApolloError("Unauthorized", "404");
      }

      // }catch(e){
      //   throw new ApolloError(e, e.extensions.code);
      // }
      

  },
  

  DeleteFilm: async (parent: any, args: IDeleteFilmArgs, ctx: IContext) => {
   // try{
      const {db, user} = ctx;
      if(!user) throw new ApolloError("Unauthorized", "404");
      const filmsCollection= db.collection("Peliculas");
      if(ctx.user.email){
        const recet = await filmsCollection.findOne({"_id": new ObjectId(args.id), author: ctx.user.email});
        if(recet) {
          await filmsCollection.deleteOne(recet);
        return "Pelicula eliminada";
        }else {
          throw new ApolloError("you cannot delete a film that is not yours", "404");
        }
      }
      
    // }catch(e){
    //   throw new ApolloError(e, e.extensions.code);
    // }

  },

  UpdateFilm: async (parent: any, args: any, ctx: IContext) => {
     // try{
      const {db, user} = ctx;
      if(!user) throw new ApolloError("Unauthorized", "404");
        const recipesCollection = db.collection("Peliculas");

        const found = await recipesCollection.findOne({ "_id": new ObjectId(args.id)});
        if (!found) throw new ApolloError(`Film with id ${args.id} does not exist`, "403");
        else{
            if(found.author != ctx.user?.email)  throw new ApolloError("You did not create this recipe ", "403");
            else{
  
                  //{ name: args.recipe?.name, description: args.recipe?.description, ingredients: args.recipe?.ingredients}
                  await recipesCollection.updateOne({ "_id": new ObjectId(args.id)},{ $set:{ name: args.name, description: args.description}});
                  return "Film updated";
            }

        }
      // }catch(e){
      //   throw new ApolloError(e, e.extensions.code);
      // }
    

  },

  SignIn: async ( parent: any, args: { email: string; pwd: string },ctx: IContext) => {   
    // try{  
        const db: Db = ctx.db;
        const userColl = db.collection("Usuarios");
        const exists = await userColl.findOne({ email: args.email });
          if (exists) {
            throw new ApolloError("User already exists", "USER_EXISTS");
            
          }else{
          
            const pwns = await bcrypt.hashSync(args.pwd,salt );
            const {insertedId} =await  userColl.insertOne({ email: args.email, pwd: pwns, token: null });
            
            return {_id:insertedId, email: args.email, pwd: pwns};
          }
    // }catch(e){
    //   throw new ApolloError(e, e.extensions.code);
    // }
   
  },

  LogIn: async (parent: any,args: { email: string; pwd: string },ctx: IContext)=> {  
     // try{
          const users = await ctx.db
        .collection("Usuarios");
        const user = await users.findOne({ email: args.email });
        const salt = 10; //await bcrypt.genSalt(10);
        if(user){
            const auth = await bcrypt.compare(args.pwd,user['pwd']);
            if(auth){
      
              const token = Math.random().toString(36).substring(2, 15) ;
              await users.updateOne({ email: args.email }, { $set: {  token } });
            /* setTimeout(() => {
                users
                  .updateOne({ email: args.email }, { $set: { token: "" } });
              }, 60 * 60 * 1000);*/
              return token;
            } else {
              throw new ApolloError("User and/or password do not match", "404");
            }
          }else throw new ApolloError("User and/or password do not match", "404");
      // }catch(e){
      //   throw new ApolloError(e, e.extensions.code);
      // }
  
  },

  LogOut: async (parent: any, args: any, ctx: IContext) => {
    //try{
      const {db, user} = ctx;
      if(!user) throw new ApolloError("Unauthorized", "404");
      else{
        const iduser = user._id;
        await db.collection("Usuarios").updateOne({_id: new ObjectId(iduser)},{$set:{token: null}});
        return true;
      }

 
  },


};

export {Mutation }


