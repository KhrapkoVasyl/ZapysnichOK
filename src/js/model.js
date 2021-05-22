export const state = {
  notes: [],
  notesId: [],
  folders: {},
  currentNotesView: [],
  pinNoteID: null,
};

const storage = window.localStorage;

function writeToStorage() {
  storage.setItem('notes', JSON.stringify(state.notes));
  storage.setItem('folders', JSON.stringify(state.folders));
}

function getDataFromStorage() {
  const writtenNotes = JSON.parse(storage.getItem('notes'));
  const writtenFolders = JSON.parse(storage.getItem('folders'));
  if (writtenNotes) {
    state.notes = writtenNotes;
    pushNotesIdInArray();
  }
  if (writtenFolders) state.folders = writtenFolders;
}

getDataFromStorage();

function pushNotesIdInArray() {
  for (const note of state.notes) {
    state.notesId.push(note.id);
  }
}

export class Note {
  constructor(title, description, time, folder) {
    this.title = title;
    this.description = description;
    this.time = time;
    this.folder = folder;
    this.id = this._generateId();
  }

  _generateId() {
    let id = new Date().getTime();
    while (state.notesId.includes(id)) {
      id++;
    }
    state.notesId.push(id.toString());
    return id.toString();
  }
}

export const addNote = function(title, description, time, folder) {
  const newNote = new Note(title, description, time, folder);
  state.notes.unshift(newNote);
  writeToStorage();
};

console.log(state);

export class Folder {
  constructor(name) {
    this.name = name;
  }

  addNoteToFolder(note) {
    state.folders.name.unshift(note);
  }
}

export function addFolder(name) {
  const newFolder = new Folder(name);
  state.folders[newFolder.name] = [];
  writeToStorage();
}

function sortNotes(callback) {
  return function() {
    const sortedNotes = [...state.notes];
    if (state.pinNoteID) {
      const indexPinNote = state.notesId.indexOf(state.pinNoteID);
      console.log(indexPinNote);
      const pinnedNote = sortedNotes.splice(indexPinNote, 1);
      sortedNotes.sort(callback);
      sortedNotes.unshift(pinnedNote[0]);
    } else {
      sortedNotes.sort(callback);
    }
    state.currentNotesView = sortedNotes;
    console.log(sortedNotes);

    return sortedNotes;
  };
}

// partial
function compareStrZA(a, b) {
  return a.title < b.title ? 1 : -1;
}

function compareStrAZ(a, b) {
  return a.title > b.title ? 1 : -1;
}

export const sortFirstLater = sortNotes((a, b) => a.time - b.time);
export const sortFirstEarlier = sortNotes((a, b) => b.time - a.time);
export const sortByAZ = sortNotes(compareStrAZ);
export const sortByZA = sortNotes(compareStrZA);

export const deleteNote = function deleteNotes(id) {
  const index = state.notesId.indexOf(id);
  const index2 = state.notes.findIndex((element) => element.id === id);
  state.notesId.splice(index, 1);
  state.notes.splice(index2, 1);
  writeToStorage();
};

export const findNoteById = function(id) {
  const searchResult = state.notes.find((note) => note.id === id);
  return searchResult;
};
