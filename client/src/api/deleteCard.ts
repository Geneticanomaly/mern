import {API_URL} from "./config";

export async function deleteCard(deckId: string, index: number) {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
        method: "DELETE",
    });
    return res.json();
}
