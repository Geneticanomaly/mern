import "./App.css";

import Deck from "./components/Deck";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ListDecks from "./components/ListDecks";

// Note: A bug while creating a new deck which is named as a previous deck
// When deleting the newly created deck - server crashes

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ListDecks />} />
                </Routes>
                <Routes>
                    <Route path="/decks/:deckId" element={<Deck />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
