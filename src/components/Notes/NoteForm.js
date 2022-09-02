import React from "react";
import "../../styles/NoteForm.css";

class NoteForm extends React.Component {
  _charLimit = 50;

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      charLeft: this._charLimit,
    };

    this.onTitleChangedHandler = this.onTitleChangedHandler.bind(this);
    this.onBodyChangedHandler = this.onBodyChangedHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    this.onCancelKey = this.onCancelKey.bind(this);
    this.charLeftCounter = this.charLeftCounter.bind(this);
  }

  onTitleChangedHandler(event) {
    const title = this.charLeftCounter(event.target.value);
    this.setState({ title });
  }

  onCancelKey(event) {
    if (
      event.target.value.length === this._charLimit &&
      event.key !== "Backspace"
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onBodyChangedHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;
    this.props.addNote({ title, body });
    this.setState({ title: "", body: "" });
  }

  charLeftCounter(text) {
    let textLength = text.length;
    this.setState({ charLeft: this._charLimit - textLength });
    return text;
  }

  render() {
    return (
      <form className="note-form" onSubmit={this.onSubmitEventHandler}>
        <h2 className="note-form-title">Buat Catatan</h2>
        <input
          className="note-input"
          type="text"
          onKeyDown={this.onCancelKey}
          onChange={this.onTitleChangedHandler}
          value={this.state.title}
          placeholder="Ketik judul catatanmu disini..."
          required
        />
        <p className="note-counter">Sisa karakter: {this.state.charLeft}</p>
        <textarea
          className="note-input"
          onChange={this.onBodyChangedHandler}
          value={this.state.body}
          placeholder="Ketik catatanmu disini..."
          required
        ></textarea>
        <button className="note-submit">Simpan</button>
      </form>
    );
  }
}

export default NoteForm;
