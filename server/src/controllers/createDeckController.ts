import {Request, Response, NextFunction} from "express";
import Deck from "../models/Deck";

async function createDeckController(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    const deckTitle = await Deck.findOne({title: req.body.title});

    if (!deckTitle) {
        const newDeck = new Deck({
            title: req.body.title,
        });
        const createdDeck = await newDeck.save();
        res.json(createdDeck);
    } else {
        return res.json("That deck already exists");
    }
}

export default createDeckController;
