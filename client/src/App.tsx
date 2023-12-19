import {useEffect, useState} from "react";
/* import {TiDelete} from "react-icons/ti"; */
import {CiEdit} from "react-icons/ci";
import "./App.css";

type Deck = {
    _id: string;
    title: string;
    edit?: boolean;
};

function App() {
    const [title, setTitle] = useState("");
    const [decks, setDecks] = useState<Deck[]>([]);
    const [editDeckId, setEditDeckId] = useState<string | null>(null);
    /* const [edit, setEdit] = useState(false); */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/decks", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({title: title}),
        });
        const deck = await res.json();
        setDecks([...decks, deck]);
        setTitle("");
    };

    const handleDelete = async (deckId: string) => {
        await fetch(`http://localhost:5000/decks/${deckId}`, {
            method: "DELETE",
        });
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
        const getDecks = async () => {
            const res = await fetch("http://localhost:5000/decks");
            const data: Deck[] = await res.json();

            const decksWithEdit: Deck[] = data.map((deck) => ({...deck, edit: false}));
            setDecks(decksWithEdit);
        };
        getDecks();
    }, []);

    return (
        <div className="App">
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
                                    type="text"
                                    value={deck.title}
                                    onChange={(e) => handleEditChange(e, deck._id)}
                                    onKeyDown={(e) => handleEnterKeyPress(e)}
                                />
                            ) : (
                                deck.title
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
        </div>
    );
}

export default App;
