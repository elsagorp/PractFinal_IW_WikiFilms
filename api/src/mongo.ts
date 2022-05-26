import { Db, MongoClient } from "mongodb";


export const connectDB = async (): Promise<Db> => {


  const uri: string = process.env.MONGO_URL || "mongodb+srv://abc:xyz@123.mongodb.net/?w=majority";
  if(!uri) throw new Error("No mongo url");
  const client = new MongoClient(uri);
console.log(uri);
  try {
      await client.connect();
      console.info("MongoDB connected");
      const db = await client.db("Wiki");
      return db;
   } catch (e) {
      throw e;
    }
  
};