import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCards} from "../api/getCards";
import {createCard} from "../api/createCard";
import "../App.css";
import {deleteCard} from "../api/deleteCard";

const DeckCards = () => {
    const [deck, setDeck] = useState<string>("");
    const [text, setText] = useState("");
    const [cards, setCards] = useState<string[]>([]);

    const {deckId} = useParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {cards} = await createCard(deckId!, text);
        setCards(cards);
        console.log(cards);

        setText("");
    };

    const handleDelete = async (index: number) => {
        console.log("MY index: " + index);
        if (!deckId) return;
        const newDeck = await deleteCard(deckId, index);
        console.log(newDeck.cards);
        setCards(newDeck.cards);
    };

    useEffect(() => {
        const fetchCards = async () => {
            if (!deckId) return;
            const newDeck = await getCards(deckId);
            setDeck(newDeck.title);
            setCards(newDeck.cards);
        };
        fetchCards();
    }, [deckId]);

    return (
        <>
            <h1>Cards - {deck}</h1>
            {
                <div className="cards">
                    {cards.map((card, index) => (
                        <li key={index}>
                            <button className="btn-delete" onClick={() => handleDelete(index)}>
                                X
                            </button>
                            {card}
                        </li>
                    ))}
                </div>
            }

            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label className="deck-label" htmlFor="card-text">
                    Card text
                </label>
                <input
                    id="card-text"
                    className="input-deck"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn" type="submit">
                    Create card
                </button>
            </form>
        </>
    );
};

export default DeckCards;
