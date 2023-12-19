import {Request, Response} from "express";
import Deck from "../models/Deck";

async function deleteCardController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).json("No deck with this id exists");
    deck.cards.splice(parseInt(index), 1);
    await deck.save();

    console.log(deck);

    res.json(deck);
}

export default deleteCardController;
