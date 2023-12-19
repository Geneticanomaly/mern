import {API_URL} from "./config";

export type Card = {
    _id: string;
    text: string;
};

export async function getCards(deckId: string): Promise<Card[]> {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards`);
    return res.json();
}
