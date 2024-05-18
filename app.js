import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {} from "dotenv/config";
import admin from 'firebase-admin';
import authenticateFirebaseToken from "./middlewares/auth.js";
import serviceAccount from "./cruduser-aeab6-firebase-adminsdk-9ze7e-79e7710cb3.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "cruduser-aeab6.firebaseapp.com",
  projectId: "cruduser-aeab6",
  storageBucket: "cruduser-aeab6.appspot.com",
  messagingSenderId: "390047756510",
  appId: "1:390047756510:web:eb4b11cc02dacf3250124f",
  measurementId: "G-QGX81H83R4"
};

//Initializing firebase admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.MONGO_URL_LOCAL
// });

admin.initializeApp(firebaseConfig);

app.get("/", (req,res)=>{
    res.send("Updating Users");
});


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Users API",
        version: "1.0.0",
        description: "A simple Express Users API"
      },
  
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local Deployment"
        },
        {
          url: "https://cruduser-kglh.onrender.com",
          description: "Online Server Deployment"
        }
      ],
    },
    apis: ["./routes/*.js"],
  };

  const specs = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Importing the router
import routerUser from "./routes/userRoutes.js";

app.use("/user", authenticateFirebaseToken, routerUser);

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
});



export default app;
