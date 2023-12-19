import "./App.css";

import DeckCards from "./components/DeckCards";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ListDecks from "./components/ListDecks";
import Header from "./components/header/Header";

// Note: A bug while creating a new deck which is named as a previous deck
// When deleting the newly created deck - server crashes

function App() {
    return (
        <Router>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/" element={<ListDecks />} />
                </Routes>
                <Routes>
                    <Route path="/decks/:deckId" element={<DeckCards />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
