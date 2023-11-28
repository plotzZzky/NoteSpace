import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function SiteCard(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function go_site() {
    let url = props.data.url
    window.open(url, "_blank").focus()
  }

  function delete_site(event) {
    let url = 'http://127.0.0.1:8000/sites/del/'
    const formData = new FormData();
    formData.append("id", props.data.id);

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        props.update()
      })

      event.stopPropagation();
  }

  return (
    <div className="site-margin">
      <div className='site-card' style={{ backgroundColor: props.data['color'], cursor: 'pointer' }}  onClick={go_site}>
        <div className="site-div-title">
          <a className='site-title' type="Text" id="TitleInput">{props.data.title}</a>
        </div>
        <a className='url-input' id="UrlInput" >{props.data.url} </a>
        <div className='site-align-btns'>
          <a className='delete-btn' onClick={delete_site}> <FontAwesomeIcon icon={faTrash} /> </a>
        </div>
      </div>
    </div>  
  )
}