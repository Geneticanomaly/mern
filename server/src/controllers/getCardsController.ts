import {Request, Response} from "express";
import Deck from "../models/Deck";

async function getCardsController(req: Request, res: Response) {
    const {deckId} = req.params;
    const deck = await Deck.findById(deckId);
    /* console.log(deck); */
    res.json(deck);
}

export default getCardsController;
