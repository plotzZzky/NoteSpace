import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)


export default function SiteCard(props) {


  function go_site() {
    let url = props.data.url
    window.open(url, "_blank").focus()
  }

  return (
    <div className='site-card' style={{ backgroundColor: props.data['color'] }}>
      <div className="site-div-title">
        <a className='site-title' type="Text" id="TitleInput" onClick={go_site}>{props.data.title}</a>
      </div>
      <a className='url-input' id="UrlInput" >{props.data.url} </a>
      <div className='site-align-btns'>
        <a className='delete-btn' onClick={props.delete}> <FontAwesomeIcon icon="fa-solid fa-trash" /> </a>
      </div>
    </div>
  )
}