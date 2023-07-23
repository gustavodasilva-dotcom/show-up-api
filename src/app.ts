import express from "express";
import "dotenv/config";
import * as bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import fileupload from "express-fileupload";
import credentials from "./middlewares/credentials";
import { corsOptions } from "./config/configOptions";
import connectDb from "./database/mongo";
import configRoutes from "./configRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

connectDb();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(bodyParser.json());

app.use(fileupload());

configRoutes(app);

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");
  
  app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});