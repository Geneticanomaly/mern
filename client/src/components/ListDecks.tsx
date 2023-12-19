import {useEffect, useState, useRef} from "react";
import {CiEdit} from "react-icons/ci";
import {Link} from "react-router-dom";
import {deleteDeck} from "../api/deleteDeck";
import {createDeck} from "../api/createDeck";
import {Deck, getDecks} from "../api/getDecks";

const ListDecks = () => {
    const [title, setTitle] = useState("");
    const [decks, setDecks] = useState<Deck[]>([]);
    const [editDeckId, setEditDeckId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const deck = await createDeck(title);
        setDecks([...decks, deck]);
        setTitle("");
    };

    const handleDelete = async (deckId: string) => {
        deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck._id !== deckId));
    };

    const handleEditToggle = (deckId: string) => {
        // If edit is pressed again return out of edit mode - Optional
        /* setEditDeckId((prevDeckId) => (prevDeckId === deckId ? null : deckId)); */

        setEditDeckId(deckId);
        setDecks((prevDecks) =>
            prevDecks.map((deck) => ({
                ...deck,
                edit: deck._id === deckId ? !deck.edit : deck.edit,
            }))
        );
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, deckId: string) => {
        e.preventDefault();
        setDecks((prevDecks) =>
            prevDecks.map((deck) => ({
                ...deck,
                title: deck._id === deckId ? e.target.value : deck.title,
            }))
        );
    };

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditDeckId(null);
        }
    };

    useEffect(() => {
        const fetchDecks = async () => {
            const data: Deck[] = await getDecks();

            const decksWithEdit: Deck[] = data.map((deck) => ({...deck, edit: false}));
            setDecks(decksWithEdit);
        };
        fetchDecks();
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [editDeckId]);

    return (
        <>
            <h1>Decks</h1>
            {
                <div className="decks">
                    {decks.map((deck) => (
                        <li key={deck._id}>
                            <button className="btn-delete" onClick={() => handleDelete(deck._id)}>
                                X
                            </button>
                            <button className="btn-edit" onClick={() => handleEditToggle(deck._id)}>
                                <CiEdit size={18} />
                            </button>
                            {editDeckId === deck._id ? (
                                <input
                                    className="edit-text"
                                    ref={inputRef}
                                    type="text"
                                    value={deck.title}
                                    onChange={(e) => handleEditChange(e, deck._id)}
                                    onKeyDown={(e) => handleEnterKeyPress(e)}
                                />
                            ) : (
                                <Link className="link" to={`/decks/${deck._id}`}>
                                    {deck.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </div>
            }
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label className="deck-label" htmlFor="deck-title">
                    Deck title
                </label>
                <input
                    id="deck-title"
                    className="input-deck"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="btn" type="submit">
                    Create Deck
                </button>
            </form>
        </>
    );
};

export default ListDecks;
