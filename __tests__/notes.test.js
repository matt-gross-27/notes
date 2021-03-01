const fs = require("fs");

const { 
  filterByQuery, 
  findById, 
  createNewNote, 
  validateNote,
  deleteNoteById
} = require('../lib/notes');

const notes = require('../db/db.json');

jest.mock("fs");

test("creates a note object", () => {
  const noteObj = {
    "title": "Test Title",
    "text": "Test text",
  }
  const note = createNewNote(noteObj, notes);
  expect(note.title).toBe("Test Title");
  expect(note.text).toBe("Test text");
});

test("filters by query q=", () => {
  const notesArr = [
    {
      "title": "Test Title seArchMe",
      "text": "Test text",
      "id": "0"
    },
    {
      "title": "Hello",
      "text": "World",
      "id": "1"
    },
    {
      "title": "Whats Up",
      "text": "Man",
      "id": "2"
    }
  ];

  const queryTitle = filterByQuery({ title: "heLlO" }, notesArr)
  expect(queryTitle[0].text).toBe("World");
  expect(queryTitle.length).toEqual(1);

  const queryText = filterByQuery({ text: "test" }, notesArr)
  expect(queryText[0].title).toBe("Test Title seArchMe");
  expect(queryText.length).toEqual(1);

  const queryQ = filterByQuery({ q: "a" }, notesArr)
  expect(queryQ[0].title).toBe("Test Title seArchMe");
  expect(queryQ[1].id).toBe("2");
  expect(queryQ.length).toEqual(2);
});

test("finds note by id", () => {
  const notesArr = [
    {
      "title": "Test Title seArchMe",
      "text": "Test text",
      "id": "0"
    },
    {
      "title": "Hello",
      "text": "World",
      "id": "1"
    },
    {
      "title": "Whats Up",
      "text": "Man",
      "id": "2"
    }
  ];
  const result = findById("2", notesArr);
  expect(result.title).toBe("Whats Up");
  expect(result.text).toBe("Man");
  expect(result.id).toBe("2");
});

test("validates note fields as non empty strings", () => {
  const validNote = {
    "title": "test",
    "text": "test"
  };
  const invalidNote ={
    "title": "",
    "text": "test"
  };
  const invalidNote2 ={
    "title": "test",
    "text": 1
  };

  expect(validateNote(validNote)).toBe(true);
  expect(validateNote(invalidNote)).toBe(false);
  expect(validateNote(invalidNote2)).toBe(false);
});

test("deletes note with matching id and returns new notes array", () => {
  const notesArr = [
    {
      "title": "Test Title seArchMe",
      "text": "Test text",
      "id": 0
    },
    {
      "title": "Hello",
      "text": "World",
      "id": 1
    },
    {
      "title": "Whats Up",
      "text": "Man",
      "id": 2
    }
  ];

  expect(deleteNoteById("1", notesArr).length).toEqual(2);
});