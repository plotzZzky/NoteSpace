'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import NoteCard from '@comps/noteCard'


export default function Notes() {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : null);
  const router = useRouter();

  const [getNotesCard, setNotesCard] = useState([]);

  const [getTitle, setTitle] = useState('Titulo da nota');
  const [getText, setText] = useState('Nota de test');
  const [getColor, setColor] = useState("");

  function checkLogin() {
    if (getToken !== null && typeof getToken === 'string') {
      getAllNotes()
    } else {
      router.push("/login/");
    }
  }

  // Notes
  function getAllNotes() {
    let url = "http://127.0.0.1:8000/notes/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken}
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { createNotesCard(data['notes']) })
  }

  function createNotesCard(notes) {
    if (notes) {
      setNotesCard(
        notes.map((data) => (
          <NoteCard key={data.id} data={data} update={getAllNotes}></NoteCard>))
      )
    } else {
      router.push("/login")
    }
  }

  function saveNewNote() {
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
        setFormDefault();
        getAllNotes();
      });
  }

  // retorna os valores do form para os padrão
  function setFormDefault() {
    setTitle('Titulo da nota')
    setText('Nota de teste')
    setColor('')
    document.getElementById("TitleInput").innerText = getTitle
  }

  // Sets
  function changeTitle(event) {
    const value = event.target.textContent
    changeTitle(value)
  }

  function changeText(event) {
    const value = event.target.value
    setText(value)
  }

  function changeColor(event) {
    const value = event.target.value
    setColor(value)
  }

  useEffect(() => {
    checkLogin()
  }, []);


  return (
    <>
      <div className="page">
        <div className="cards">
          <div className="note-margin">
            <div className='note-card' style={{'background': getColor}}> 
              <a  contentEditable='true' className='note-title' id="TitleInput" onInput={changeTitle}> {getTitle} </a>
              <textarea className='note-text' id="TextInput" rows={"5"} cols={"16"} wrap="hard" onChange={changeText} value={getText}>
              </textarea>

              <div className='note-align-btns'>
                <div className="note-save" onClick={saveNewNote} > <FontAwesomeIcon icon={faFloppyDisk} /></div>
                <input type="Color" className="note-colorSelect" onChange={changeColor}></input>
              </div>
            </div>
          </div>

          {getNotesCard}
        </div>
      </div>
    </>
  )
}