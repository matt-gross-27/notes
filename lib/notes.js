const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArr) {
  let filteredResults = notesArr
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title.toLowerCase() === query.title.toLowerCase())
  }
  if (query.text) {
    filteredResults = filteredResults.filter(note => note.text.toLowerCase().search(query.text.toLowerCase()) !== -1)
  }
  if (query.q) {
    filteredResults = filteredResults
      .filter(note => {
        const searchText = note.text.toLowerCase().search(query.q.toLowerCase());
        const searchTitle = note.title.toLowerCase().search(query.q.toLowerCase());
        if (searchText === -1 && searchTitle === -1) {
          return false;
        } else {
        return true
      }
    })
  }
  return filteredResults;
};

function findById(id, notesArr) {
  const result = notesArr.filter(note => note.id.toString() === id)[0];
  return result;
};

function createNewNote(body, notesArr) {
  const note = body;
  notesArr.push(note);
  fs.writeFileSync(
    path.join(__dirname,'../db/db.json'),
    JSON.stringify(notesArr, null, 2));
  return note;
};

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
};

function deleteNoteById(id, notesArr) {
  notesArr = notesArr.filter(note => note.id.toString() !== id);
  fs.writeFileSync(path.join(__dirname,'../db/db.json'), JSON.stringify(notesArr, null, 2));
};

function readDb() {
  let latestNotes = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'), 'utf-8'));
  return latestNotes;
}

module.exports = { 
  filterByQuery, 
  findById, 
  createNewNote, 
  validateNote,
  deleteNoteById,
  readDb
}