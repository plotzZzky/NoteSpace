import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)


export default function NoteCard(props) {

  return (
    <div className='note-card' style={{ backgroundColor: props.data['color'] }}>
      <a className='note-title'> {props.data['title']} </a>
      <pre className='note-text' style={{ whiteSpace: "pre-wrap;", wordWrap: "break-word" }}>
        {props.data['text']}
      </pre>
      <div className='note-align-btns'>
        <a className='delete-btn' onClick={props.delete}> <FontAwesomeIcon icon="fa-solid fa-trash" /> </a>
        <a> {props.data['date']} </a>
      </div>
    </div>
  )
}