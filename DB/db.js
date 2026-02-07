import mongoose from "mongoose";

const connectDb = async(DATABASEURL)=>{
    try {
        const dboption={
            dbName :'srm'
        }
      const response = await  mongoose.connect(DATABASEURL,dboption);
      if(response){
        console.log("database connected")
      }
      else{
        console.log("db not connected")
      }
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDb;