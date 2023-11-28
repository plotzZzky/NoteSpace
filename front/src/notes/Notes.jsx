import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import NavBar from "../elements/navbar";
import NoteCard from '../elements/noteCard'


export default function Notes() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getNotesCard, setNotesCard] = useState([]);

  const [getTitle, setTitle] = useState('Titulo da nota');
  const [getText, setText] = useState('Nota de test');
  const [getColor, setColor] = useState("");

  function check_login() {
    if (getToken == undefined) {
      location.href = "/login/";
    } else {
      get_all_notes();
    }
  }

  // Notes
  function get_all_notes() {
    let url = "http://127.0.0.1:8000/notes/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken}
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { create_notes_card(data['notes']) }
      )
  }

  function create_notes_card(notes) {
    setNotesCard(
      notes.map((data) => (
        <NoteCard key={data.id} data={data} delete={() => delete_note(data["id"])}></NoteCard>))
    )
  }

  function save_note() {
    let url = "http://127.0.0.1:8000/notes/new/"
    const formData = new FormData();
    formData.append("title", getTitle);
    formData.append("text", getText);
    formData.append("color", getColor)

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        set_form_default();
        get_all_notes();
      });
  }

  function delete_note(note_id) {
    let url = 'http://127.0.0.1:8000/notes/del/'

    const formData = new FormData();
    formData.append("id", note_id);

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        get_all_notes()
      })
  }

  // retorna os valores do form para os padrão
  function set_form_default() {
    setTitle('Titulo da nota')
    setText('Nota de teste')
    setColor('')
    document.getElementById("TitleInput").innerText = getTitle
  }

  // Sets
  function set_title(event) {
    const value = event.target.textContent
    setTitle(value)
  }

  function set_text(event) {
    const value = event.target.value
    setText(value)
  }

  function change_color(event) {
    const value = event.target.value
    setColor(value)
  }

  useEffect(() => {
    check_login()
  }, []);


  return (
    <>
      <NavBar></NavBar>

      <div className="page">
        <div className="cards-div">
          <div className="note-margin">
            <div className='note-card' style={{'background': getColor}}> 
              <a  contentEditable='true' className='note-title' id="TitleInput" onInput={set_title}> {getTitle} </a>
              <textarea className='note-text' id="TextInput" rows={"5"} cols={"20"} wrap="hard" onChange={set_text} value={getText}>
              </textarea>

              <div className='note-align-btns'>
                <a className="note-save" onClick={save_note} > <FontAwesomeIcon icon={faFloppyDisk} /></a>
                <input type="Color" className="note-colorSelect" onChange={change_color}></input>
              </div>
            </div>
          </div>

          {getNotesCard}
        </div>
      </div>
    </>
  )
}