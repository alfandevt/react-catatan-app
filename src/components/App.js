import React, { Component } from "react";
import "../styles/App.css";
import { getInitialData } from "../utils/data";
import Header from "./Header/Header";
import NoteForm from "./Notes/NoteForm";
import NoteSection from "./Notes/NoteSection";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      keyword: "",
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  onSearchNoteHandler(event) {
    this.setState({ keyword: event.target.value });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: `${+new Date()}${Math.round(Math.random() * 10)}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  onDeleteNoteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveNoteHandler(id) {
    this.setState((prevState) => {
      const newState = prevState.notes.map((obj) => {
        if (obj.id === id) {
          return { ...obj, archived: !obj.archived };
        }
        return obj;
      });
      
      return { notes: newState };
    });
  }

  renderNotes() {
    let archivedNotes = [];
    let unArchivedNotes = [];
    let filteredNotes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    filteredNotes.forEach((note) => {
      if (note.archived) {
        archivedNotes.push(note);
      } else {
        unArchivedNotes.push(note);
      }
    });

    return (
      <>
        <NoteSection
          headingTitle="Catatan Aktif"
          notes={unArchivedNotes}
          onDelete={this.onDeleteNoteHandler}
          onArchive={this.onArchiveNoteHandler}
        />
        <NoteSection
          headingTitle="Catatan Arsip"
          notes={archivedNotes}
          onDelete={this.onDeleteNoteHandler}
          onArchive={this.onArchiveNoteHandler}
        />
      </>
    );
  }

  render() {
    return (
      <div className="note-app">
        <Header onSearch={this.onSearchNoteHandler} />
        <div className="note-app__body">
          <NoteForm addNote={this.onAddNoteHandler} />
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

export default App;
