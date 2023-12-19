import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";

import {config} from "dotenv";
import getDecksController from "./controllers/getDecksController";
import createDeckController from "./controllers/createDeckController";
import deleteDeckController from "./controllers/deleteDeckController";
import createCardController from "./controllers/createCardController";

config();

var cors = require("cors");

const port = 5000;
const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId/cards", createCardController);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log("listening on port " + port);
    app.listen(port);
});
