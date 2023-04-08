import { useState, useEffect, SetState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave } from '@fortawesome/free-solid-svg-icons'

library.add(faSave)

import NavBar from "../elements/navbar";
import './Notes.css'
import NoteCard from '../elements/noteCard'


export default function Notes() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));
    const [getNotes, setNotes] = useState([]);
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
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then((res) => res.json())
        .then((data) =>{ setNotes(data['notes'])}
        )
    }

    function save_note() {
        let url = "http://127.0.0.1:8000/notes/new/"
        let title = document.getElementById("TitleInput").innerHTML
        let text = document.getElementById("TextInput").value
        let json = {
                    'title': title,
                    'text': text,
                    'color': getColor,
                    }

        let data = {method: 'POST', 
                    headers: {'Content-Type':'application/json',
                    Authorization: 'Token ' + getToken},
                    body: JSON.stringify(json)}

        fetch(url, data)
            .then((reponse) => reponse.json())
            .then((data) => {
            alert(data.text) 
            get_all_notes()
        })
    }

    function delete_note(note_id) {
        let url = `http://127.0.0.1:8000/notes/delete/id=${note_id}`
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}
                    }
        fetch(url, data)
        .then((reponse) => reponse.json())
        .then((data) => {
            alert(data.text)
            get_all_notes()
        })
    }

    useEffect( () => {
        check_login()
    }, []);


    return (
        <>
            <NavBar></NavBar>

            <div className="page">
                <div className="notes-div">

                    <div className='note-card'>
                        <a contentEditable="true" className='note-title' type="Text" id="TitleInput"> Titulo </a>
                        <textarea className='note-text' id="TextInput" rows={"2"} cols={"20"} wrap="hard" >
                            Prencha algo e salve para criar uma nota
                        </textarea>
                        <div className='note-align-btns'>
                            <a className="note-save" onClick={() => save_note()} > <FontAwesomeIcon icon="fa-solid fa-floppy-disk fa-xl" /></a>
                            <input type="Color" className="note-colorSelect" onChange={(e) => setColor(e.target.value)}></input>
                        </div>
                    </div>

                    {getNotes.map((data) => (
                    <NoteCard key={data.id} data={data} delete={() => delete_note(data["id"])}></NoteCard> ))}
                </div>
            </div>
        </>
    )
}