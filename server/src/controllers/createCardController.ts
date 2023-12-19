import {Request, Response, NextFunction} from "express";
import Deck from "../models/Deck";

async function createCardController(req: Request, res: Response, next: NextFunction) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);

    console.log(req.body);
    const {text} = req.body;
    if (!deck) return res.status(400).json("No deck of this id was found");

    deck.cards.push(text);
    await deck.save();

    res.json(deck);

    /* const cardTitle = await Deck.findOne({title}); */

    /* const deckTitle = await DeckModel.findOne({title: req.body.title});

    if (!deckTitle) {
        const newDeck = new DeckModel({
            title: req.body.title,
        });
        const createdDeck = await newDeck.save();
        res.json(createdDeck);
    } else {
        return res.json("That deck already exists");
    } */
}

export default createCardController;
