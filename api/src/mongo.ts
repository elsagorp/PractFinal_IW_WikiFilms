import { Db, MongoClient } from "mongodb";


export const connectDB = async (): Promise<Db> => {


  const uri: string = process.env.MONGO_URL   || "mongodb+srv://Picard:engage@mongomake.3ta2r.mongodb.net/MongoMake?retryWrites=true&w=majority";
  if(!uri) throw new Error("No mongo url");
  const client = new MongoClient(uri);
console.log(uri);
  try {
      await client.connect();
      console.info("MongoDB connected");
      const db = await client.db("test");
      return db;
   } catch (e) {
      throw e;
    }
  
};