import {useEffect, useState, useRef} from "react";
import {CiEdit} from "react-icons/ci";
import {Link} from "react-router-dom";
import {deleteDeck} from "../api/deleteDeck";
/* import {createDeck} from "../api/createDeck"; */

import {Card, getCards} from "../api/getCards";

const DeckCards = () => {
    const [text, setText] = useState("");
    const [cards, setCards] = useState<Card[]>([]);
    const [editCardId, setEditCardId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        /* const deck = await createDeck(title); */
        /* setDecks([...decks, deck]); */
        setText("");
    };

    return (
        <>
            <h1>Cards</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label className="deck-label" htmlFor="deck-title">
                    Deck title
                </label>
                <input
                    id="deck-title"
                    className="input-deck"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn" type="submit">
                    Create Deck
                </button>
            </form>
        </>
    );
};

export default DeckCards;
