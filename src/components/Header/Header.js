import React from "react";
import "../../styles/Header.css";

const Header = ({ onSearch }) => {
  return (
    <header className="note-app__header">
      <h1 className="note-app__brand">Catatan App</h1>
      <input
        className="note-search"
        type="text"
        onKeyUp={onSearch}
        placeholder="cari catatan..."
      />
    </header>
  );
};

export default Header;
