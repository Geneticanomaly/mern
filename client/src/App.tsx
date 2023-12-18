import {useState} from "react";
import "./App.css";

function App() {
    const [title, setTitle] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:5000/decks", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({title: title}),
        });
    };

    return (
        <div className="App">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="deck-title">Deck title</label>
                <input
                    id="deck-title"
                    type="text"
                    value={title}
                    onChange={(e) => handleChange(e)}
                />
                <button>Create Deck</button>
            </form>
        </div>
    );
}

export default App;
