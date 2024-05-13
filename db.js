import mongoose from "mongoose";
import {} from "dotenv/config";

const mongoURL = process.env.MONGO_URL_LOCAL;
// const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("Connection is established");
});

db.on("disconnected", ()=>{
    console.log("Connection Stopped");
});

export default db;