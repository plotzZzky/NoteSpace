import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function ContactCard(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);

  function openWhatsapp() {
    let number = props.data.telephone.replace('(', '').replace(')', '').replace('-', '')
    location.href = `https://api.whatsapp.com/send?phone=55${number}`
  }

  function emailTo() {
    location.href = `mailto:${props.data.email}`
  }

  function deleteContact(event) {
    let url = 'http://127.0.0.1:8000/contacts/del/'

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
    <div className='contact-margin'>
      <div className='contact-card' style={{ backgroundColor: props.data['color'] }}>
          <img className="contact-image" src='user.png' alt="profile"></img>
        <div className="div-align-contact-info">
          <a className='contact-title' type="Text" id="TitleInput">{props.data.firstname}</a>
          <p className='contact-input' id="LastnameInput" >{props.data.lastname}</p>
          <a className='contact-input' id="TelephoneInput" onClick={openWhatsapp} style={{ cursor: 'pointer' }}>{props.data.telephone}</a>
          <a className='contact-input' id="EmailInput" onClick={emailTo} style={{ cursor: 'pointer' }}>{props.data.email}</a>
          <a className='contact-input' id="SocialInput" >{props.data.social}</a>
        </div>
        <div className='contact-align-btns'>
          <a className='delete-btn' onClick={deleteContact}> <FontAwesomeIcon icon={faTrash} /> </a>
        </div>
      </div>
     </div> 
  )
}