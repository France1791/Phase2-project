import express from "express";
import passport from "passport";
import petRouter from "./routes/pet.js";
import authRouter from "./routes/auth.js";
import setupJWTStrategy from "./auth/index.js"

export default function createServer() {
    const app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.json());

    setupJWTStrategy(passport);

    app.use("/auth", authRouter)
    app.use("/pet", petRouter(passport))

    return app;

}