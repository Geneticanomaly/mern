import {API_URL} from "./config";
/* import {Deck} from "./getDecks"; */

async function editDeck(deckId: string, newTitle: string) {
    const res = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: newTitle}),
    });
    return res.json();
}

export default editDeck;
