'use strict';

console.dir("Hello world!🧠;)"); //привет

//Test modal window
const addNoteInput = document.querySelector('.add-note-input');
const overlay = document.querySelector('.overlay');
const addNoteModal = document.querySelector('.add-note-window');
const noteHeadlineInput = document.querySelector('.note-headline-input');

addNoteInput.addEventListener('focus', function () {
    overlay.classList.remove('hidden');
    addNoteModal.classList.remove('hidden');
    addNoteInput.blur();
});

addNoteModal.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.closest('.btn-close-modal')) {
        overlay.classList.add('hidden');
        overlay.classList.add('hidden');
    }
})

const deleteAllNotesBtn = document.querySelector('.delete-all-btn');
const noteCollection = document.querySelectorAll('.note');

deleteAllNotesBtn.addEventListener('click', function () {
    const confirmation = confirm('Ви дійсно бажаєте очистити список заміток?');
    if (confirmation) {
        for (const element of noteCollection) {
            element.remove();
        }
    }
});
