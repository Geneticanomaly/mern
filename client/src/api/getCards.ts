import {API_URL} from "./config";
import {Deck} from "./getDecks";

/* export type Card = {
    text: string;
}; */

export async function getCards(deckId: string): Promise<Deck> {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards`);
    /* console.log("My data", res.json()); */
    return res.json();
}
