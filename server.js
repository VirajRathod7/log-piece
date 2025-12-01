//Imports
const express = require("express");
const cors = require("cors");
const fs = require("fs");

//Creating The App
const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

const NOTES_FILE = "notes.json";

//FILE HELPERS
function loadNotes() {
    if (!fs.existsSync(NOTES_FILE)) return [];
    return JSON.parse(fs.readFileSync(NOTES_FILE));
}

function saveNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

//API routes
app.get("/notes", (req, res) => {
    const notes = loadNotes();
    res.json(notes);
});

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

app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    let notes = loadNotes();
    notes = notes.filter(note => note.id !== id);
    saveNotes(notes);
    res.json({ success: true });
});

// Serve homepage (Fix for Render)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
