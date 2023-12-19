import {Request, Response} from "express";
import Deck from "../models/Deck";

async function editDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const newTitle = req.body.title;
    const deck = await Deck.findById(deckId);
    if (!deck) return;
    deck.title = newTitle;
    await deck.save();

    return res.json(deck);
}

export default editDeckController;
