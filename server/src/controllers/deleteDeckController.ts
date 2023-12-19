import {Request, Response, NextFunction} from "express";
import Deck from "../models/Deck";

async function deleteDeckController(req: Request, res: Response) {
    const deletedDeck = await Deck.findByIdAndDelete(req.params.deckId);
    res.json({message: "Successfully deleted " + deletedDeck});
}

export default deleteDeckController;
