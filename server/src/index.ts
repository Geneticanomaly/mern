import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";

import {config} from "dotenv";
import getDecksController from "./controllers/getDecksController";
import createDeckController from "./controllers/createDeckController";
import deleteDeckController from "./controllers/deleteDeckController";
import editDeckController from "./controllers/editDeckController";

import createCardController from "./controllers/createCardController";
import getCardsController from "./controllers/getCardsController";
import deleteCardController from "./controllers/deleteCardController";

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

/* Deck related api requests */
app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.put("/decks/:deckId", editDeckController);

/* Card related api requests */
app.get("/decks/:deckId/cards", getCardsController);
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:index", deleteCardController);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log("listening on port " + port);
    app.listen(port);
});
