import React from "react";
import { showFormattedDate } from "../../utils/data";
import "../../styles/NoteItem.css";

const NoteItem = ({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
}) => {
  return (
    <article className="note-item">
      <h3 className="note-title">{title}</h3>
      <p className="note-created-at">{showFormattedDate(createdAt)}</p>
      <p className="note-body">{body}</p>
      <div className="btn-group">
        <button onClick={() => onDelete(id)} className="note-btn-delete">
          Hapus
        </button>
        <button onClick={() => onArchive(id)} className="note-btn-move">
          {!archived ? "arsipkan" : "pindahkan"}
        </button>
      </div>
    </article>
  );
};

export default NoteItem;
