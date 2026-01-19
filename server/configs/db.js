import mongoose from "mongoose";
const connectDB=async()=>{
    try{
mongoose.connection.on("connected",()=>{console.log("data base connected succesfully ")})
    let mongodburl=process.env.MONGODB_URL;
    const projectname='resume-builder';
    if(!mongodburl){
        throw new Error("MONGODB_URL environment variable not set")
        if(mongodburl.endsWith('/')){
            mongodburl=mongodburl.slice(0,-1)
        }

    }
    await mongoose.connect(`${mongodburl}/${projectname}`)
}
    catch{
    console.error("Error connecting to mongoDB:" ,error)
    }
}

export default connectDB