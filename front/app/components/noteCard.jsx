import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function NoteCard(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : null);

  // Formata a data para ser exibida
  function formatDate(value) {
    if (value) {
    const date = value.split("-")
    return `${date[2]}/${date[1]}/${date[0]}`
    }
  }

  function deleteNote(event) {
    const noteId = props.data.id
    const url = `http://127.0.0.1:8000/notes/${noteId}/`

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
    }

    fetch(url, data)
      .then(() => {
        props.update()
      })
      event.stopPropagation();
  }

  return (
    <div className='note-margin'>
      <div className='note-card' style={{ backgroundColor: props.data['color'] }}>
        <a className='note-title'> {props.data['title']} </a>
        <pre className='note-text'>
          {props.data['text']}
        </pre>
        <div className='note-align-btns'>
          <a className='delete-btn' onClick={deleteNote}> <FontAwesomeIcon icon={faTrash} /> </a>
          <a className='note-date'> {formatDate(props.data['date'])} </a>
        </div>
      </div>
    </div>
  )
}