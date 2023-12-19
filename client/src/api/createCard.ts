import {API_URL} from "./config";

export async function createCard(text: string) {
    const res = await fetch(`${API_URL}/decks`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({text: text}),
    });
    return res.json();
}
