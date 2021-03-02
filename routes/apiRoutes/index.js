const router = require('express').Router();

const { filterByQuery, findById, createNewNote, validateNote, deleteNoteById, readDb } = require('../../lib/notes');
// let latestNotes = JSON.parse(fs.readFileSync('../../db/db.json', 'utf-8'));

router.get('/notes', (req, res) => {
  let results = readDb();
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  let notes = readDb();
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404)
  }
});

router.post('/notes', (req, res) => {
  let notes = readDb();
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
  console.log(id);
  let notes = readDb();
  const deletedRecord = notes.find(note => note.id.toString() == id);
  if (!deletedRecord) {
    res.status(404).json({ message: "Note not found" });
  } else {
    console.log(deletedRecord);
    deleteNoteById(id, notes);
    res.status(200).end();
  }
});

module.exports = router;