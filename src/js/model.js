export const state = {
    notes: [],
    notesId: [],
    folders: {
        Важливе: [],
    },
};

const notesStorage = window.localStorage;
function writeToNotesStorage() {
    notesStorage.setItem('notes', JSON.stringify(state.notes));
}
function getNotesFromStorage() {
    if (notesStorage.notes) {
        state.notes = JSON.parse(notesStorage.getItem('notes'));
        pushNotesIdInArray();
    }
}
getNotesFromStorage();

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
        state.notesId.push(id);
        return id;
    }
}

export const addNote = function (title, description, time, folder) {
    const newNote = new Note(title, description, time, folder);
    state.notes.unshift(newNote);
    writeToNotesStorage();
};

console.log(state);

function normalizationFormat(data) {
    const formatter = new Intl.DateTimeFormat('uk', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    const formattedData = formatter.format(data).replace(',', '');
    return formattedData;
}

function copyObject(object){
    const objCopy = {};
    const keys = Object.keys(object);
    for (const key of keys){
        objCopy[key] = object[key];
    }
    return objCopy;
}

function copyNotes(){
    let copy = [];
    for (let i = 0; i < state.notes.length; i++){
        let note = copyObject(state.notes[i]);
        copy.push(note);
    }    
    return copy;
}

//Bubble sort
export function sortByDate(){
    let sortedNotes = copyNotes();
    for (let i = 0; i < sortedNotes.length - 1; i++){
        for (let j = 0; j < sortedNotes.length - (i + 1); j++){
            if (sortedNotes[j].time > sortedNotes[j + 1].time){
                let tmp = copyObject(sortedNotes[j]);
                sortedNotes[j] = copyObject(sortedNotes[j + 1]);
                sortedNotes[j + 1] = tmp;
            }
        }
    }
    return sortedNotes;
}