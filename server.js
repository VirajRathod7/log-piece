//Imports
const express = require("express");//Building APIs
const cors = require("cors");//connecting frontend -> backend
const fs = require("fs");//file system allows reading writing notes.json

//Creating The App
const app = express();//backend server
app.use(cors());//frontend changes
app.use(express.json());//backend can read json from frontend

const NOTES_FILE = "notes.json";

//FILE HELPERS

// Read notes from file
function loadNotes() {
    if (!fs.existsSync(NOTES_FILE)) return [];//Return empty array if file doesn't exist
    return JSON.parse(fs.readFileSync(NOTES_FILE));//read notes.json and convert text to JS array
}

// Save notes to file
function saveNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));//Saves text to notes.json
}

//API routes

// GET all notes
// Frontend calls this when the page loads.
// Backend replies with the notes list.
app.get("/notes", (req, res) => {// Get /notes=>Reads all notes
    const notes = loadNotes();
    res.json(notes);
});

// POST add a new note
app.post("/notes", (req, res) => {
    const notes = loadNotes();
    const newNote = {
        id: Date.now(),
        text: req.body.text
    };
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
});

// DELETE a note
app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    let notes = loadNotes();
    notes = notes.filter(note => note.id !== id);
    saveNotes(notes);
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
