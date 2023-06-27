import NotesView from "./NotesView.js"
import NotesAPI from "./NotesAPI.js"


export default class App {
	constructor (root) {
		this.notes = [];
		this.activeNote = null;
		this.view = new NotesView(root, this._handlers());

		this._refreshNotes();
	}

	_refreshNotes() {
		const notes = NotesAPI.getAllNotes();

		this._setNotes(notes);

		if(notes.length > 0){
			this._setActiveNote(notes[0])
		}
	}

	_setNotes(notes) {
		this.notes = notes;
		this.view.updateNoteList(notes);
		this.view.updateNotePreviewVisibility(notes.length > 0);	
	}

	_setActiveNote(note) {
		this.activeNote = note;
		this.view.updateActiveNote(note);
	}

	_handlers() {
		return {
			onNoteSelect: noteId => {
				const seletedNote = this.notes.find(note => note.id == noteId);
				this._setActiveNote(seletedNote);
			},
			onNoteAdd: () => {
				const newNote = {title: "New Note", body: "Take Note..."};
				NotesAPI.saveNote(newNote);
				this._refreshNotes();
			},
			onNoteEdit: (title, body) => {
				NotesAPI.saveNote({
					id: this.activeNote.id, 
					title, 
					body
				});

				this._refreshNotes();	
			},
			onNoteDelete: noteId => {
				NotesAPI.deleteNote(noteId);
				this._refreshNotes();
			}
		}
	}
} 