import React from "react";
import "../../styles/NoteSection.css";
import NoteList from "./NoteList";

const NoteSection = ({ notes, headingTitle, onDelete, onArchive }) => {
  const conditionalRender = () => {
    if (notes.length <= 0) {
      return <p className="note-no-item">Tidak ada catatan</p>;
    } else {
      return (
        <NoteList notes={notes} onDelete={onDelete} onArchive={onArchive} />
      );
    }
  };

  return (
    <section className="note-section">
      <h2 className="note-section-heading-title">{headingTitle}</h2>
      {conditionalRender()}
    </section>
  );
};

export default NoteSection;
