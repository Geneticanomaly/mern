import {Request, Response} from "express";
import Deck from "../models/Deck";

async function getDecksController(req: Request, res: Response) {
    const decks = await Deck.find();
    console.log(decks);
    res.json(decks);
}

export default getDecksController;
