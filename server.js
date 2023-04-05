import express from "express";
import petRouter from "./routes/pet.js";

export default function createServer() {
    const app = express();

    app.use(express.json());
  
    app.use("/pet", petRouter)
  
    return app;
  
}