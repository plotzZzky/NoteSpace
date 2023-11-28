import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function NoteCard(props) {

  return (
    <div className='note-margin'>
      <div className='note-card' style={{ backgroundColor: props.data['color'] }}>
        <a className='note-title'> {props.data['title']} </a>
        <pre className='note-text'>
          {props.data['text']}
        </pre>
        <div className='note-align-btns'>
          <a className='delete-btn' onClick={props.delete}> <FontAwesomeIcon icon={faTrash} /> </a>
          <a> {props.data['date']} </a>
        </div>
      </div>
    </div>
  )
}