const API_URL = "http://localhost:3000/notes";
const notesList = document.getElementById("notesList");
const addBtn = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");

// Load all notes on page load
async function loadNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();

    notesList.innerHTML = "";
    notes.forEach(note => {
        const el = document.createElement("div");
        el.className = "note";
        el.innerHTML = `
            <span>${note.text}</span>
            <button class="delete-btn" onclick="deleteNote(${note.id})">X</button>
        `;
        notesList.appendChild(el);
    });
}

async function addNote() {
    const text = noteInput.value.trim();
    if (!text) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    noteInput.value = "";
    loadNotes();
}

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

addBtn.addEventListener("click", addNote);
loadNotes();
