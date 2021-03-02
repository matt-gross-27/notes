const router = require('express').Router();
let notes = require('../../db/db.json');
const { filterByQuery, findById, createNewNote, validateNote, deleteNoteById } = require('../../lib/notes');

router.get('/notes', (req, res) => {
  let results = notes
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404)
  }
});

router.post('/notes', (req, res) => {
  req.body.id = Date.now();
  if(!validateNote(req.body)) {
    res.sendStatus(400).send('Improperly formatted note');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/notes/:id', (req, res) => {
  const { id } = req.params
  const deletedRecord = notes.find(note => note.id.toString() === id);
  if (!deletedRecord) {
    res.status(404).json({ message: "Note not found" });
  } else {
    console.log(deletedRecord);
    deleteNoteById(id, notes);
    res.status(200).end();
  }
});

module.exports = router;