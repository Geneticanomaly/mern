import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeckSchema = new Schema({
    title: String,
    cards: [String],
});

const Deck = mongoose.model("Deck", DeckSchema);

export default Deck;
