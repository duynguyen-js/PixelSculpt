import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import connectDB from "./mongodb/connect.js";

// express app
const app = express();

// middleware
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// starts server
const startServer = async () => {

  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(3000, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  } catch(error) {
    console.log(error)
  }
};

startServer();
