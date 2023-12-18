import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";

import {config} from "dotenv";
config();

const port = 5000;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.post("/decks", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const deckTitle = await DeckModel.findOne({title: req.body.title});

    if (!deckTitle) {
        const newDeck = new DeckModel({
            title: req.body.title,
        });
        const createdDeck = await newDeck.save();
        res.json(createdDeck);
    } else {
        return res.json("That deck already exists");
    }
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log("listening on port " + port);
    app.listen(port);
});
