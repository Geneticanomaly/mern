import {API_URL} from "./config";

export async function createCard(deckId: string, text: string) {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({text: text}),
    });
    return res.json();
}
