import {API_URL} from "./config";

export type Deck = {
    _id: string;
    title: string;
    edit?: boolean;
};

export async function getDecks(): Promise<Deck[]> {
    const res = await fetch(`${API_URL}/decks`);
    return res.json();
}
