import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {} from "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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

app.use("/user", routerUser);

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
});



export default app;
