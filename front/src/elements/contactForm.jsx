import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
import profileImg from '../media/profile.webp'


export default function ContactForm(props) {
  const [getFirstName, setFirstName] = useState("Nome");
  const [getLastName, setLastName] = useState("Sobrenome");
  const [getEmail, setEmail] = useState("Email");
  const [getTelephone, setTelephone] = useState("Telefone");
  const [getSocial, setSocial] = useState("Rede social");
  const [getColor, setColor] = useState("");


  function saveFirstName(event) {
    setFirstName(event.target.value)
  }

  function saveLastName(event) {
    setLastName(event.target.value)
  }

  function saveTelephone(event) {
    setTelephone(event.target.value)
  }

  function saveEmail(event) {
    setEmail(event.target.value)
  }

  function saveSocial(event) {
    setSocial(event.target.value)
  }

  function saveColor(event) {
    setColor(event.target.value)
  }

  function save_contact() {
    let url = "http://127.0.0.1:8000/contacts/new/"
    let json = {
      'firstname': getFirstName,
      'lastname': getLastName,
      'telephone': getTelephone,
      'email': getEmail,
      'social': getSocial,
      'color': getColor,
    }
    let data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + props.Token
      },
      body: JSON.stringify(json)
    }
    fetch(url, data)
      .then((reponse) => reponse.json())
      .then((data) => {
        alert(data.text)
        let n = Math.random()
        props.update(n)
      })
  }


  return (
    <div className='contact-card'>
      <div className="contact-div-title">
        <img className="contact-image" src={profileImg} alt="profile"></img>
        <input type="Text" className="contact-input contact-title" onChange={saveFirstName} placeholder='Name' value={getFirstName}></input>
      </div>
      <div className="div-align-contact-info">
        <input type="Text" className='contact-input' id="LastnameInput" onChange={saveLastName} placeholder='Sobrenome' value={getLastName}></input>
        <input type="Text" className='contact-input' id="TelephoneInput" onChange={saveTelephone} placeholder='Telefone' value={getTelephone}></input>
        <input type='Text' className='contact-input' id="EmailInput" onChange={saveEmail} placeholder='Email' value={getEmail}></input>
        <input type='Text' className='contact-input' id="SocialInput" onChange={saveSocial} placeholder='Media social' value={getSocial}></input>
      </div>
      <div className='site-align-btns'>
        <a className="site-save" onClick={() => save_contact()} > <FontAwesomeIcon icon="fa-solid fa-floppy-disk fa-xl" /></a>
        <input type="Color" className="site-colorSelect" onChange={saveColor}></input>
      </div>
    </div>
  )
}