const router = require('express').Router();
const notes = require('../../db/db.json');
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
    res.send(404)
  }
});

router.post('/notes', (req, res) => {
  // change id generator when we add delete notes capabilities
  req.body.id = notes.length.toString()
  if(!validateNote(req.body)) {
    res.status(400).send('Improperly formatted note');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/notes/:id', (req, res) => {
  if( req.params.id < notes.length  &&  req.params.id > -1) {
    deleteNoteById(req.params.id, notes);
    res.json(notes);
  } else {
    res.send(404);
  }
});

module.exports = router;