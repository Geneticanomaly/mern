import {API_URL} from "./config";

export async function createDeck(title: string, deckId: string) {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title: title}),
    });
    return res.json();
}
