import {useEffect, useState} from "react";
import "./App.css";

type Deck = {
    id: string;
    title: string;
};

function App() {
    const [title, setTitle] = useState("");
    const [decks, setDecks] = useState<Deck[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch("http://localhost:5000/decks", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({title: title}),
        });
        setTitle("");
    };

    useEffect(() => {
        const getDecks = async () => {
            const res = await fetch("http://localhost:5000/decks");
            const data = await res.json();
            console.log("MY DECKS: " + data);
            setDecks(data);
        };
        getDecks();
    }, []);

    return (
        <div className="App">
            {
                <div className="decks">
                    {decks.map((deck) => (
                        <li key={deck.id}>{deck.title}</li>
                    ))}
                </div>
            }
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="deck-title">Deck title</label>
                <input
                    id="deck-title"
                    className="input-deck"
                    type="text"
                    value={title}
                    onChange={(e) => handleChange(e)}
                />
                <button className="btn">Create Deck</button>
            </form>
        </div>
    );
}

export default App;
