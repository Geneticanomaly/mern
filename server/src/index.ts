import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
import {config} from "dotenv";
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

app.get("/decks", async (req: Request, res: Response) => {
    const decks = await DeckModel.find();
    console.log(decks);
    res.json(decks);
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

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
    const deletedDeck = await DeckModel.findByIdAndDelete(req.params.deckId);
    res.json({message: "Successfully deleted " + deletedDeck});
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log("listening on port " + port);
    app.listen(port);
});
