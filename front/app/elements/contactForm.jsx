import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


export default function ContactForm(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);

  const [getFirstName, setFirstName] = useState("Nome");
  const [getLastName, setLastName] = useState("Sobrenome");
  const [getEmail, setEmail] = useState("Email");
  const [getTelephone, setTelephone] = useState("Telefone");
  const [getSocial, setSocial] = useState("Rede social");
  const [getColor, setColor] = useState("");


  function saveFirstName(event) {
    setFirstName(event.target.textContent)
  }

  function saveLastName(event) {
    setLastName(event.target.textContent)
  }

  function saveTelephone(event) {
    setTelephone(event.target.textContent)
  }

  function saveEmail(event) {
    setEmail(event.target.textContent)
  }

  function saveSocial(event) {
    setSocial(event.target.textContent)
  }

  function saveColor(event) {
    setColor(event.target.value)
  }

  function save_contact() {
    let url = "http://127.0.0.1:8000/contacts/new/"

    const formData = new FormData();
    formData.append('firstname', getFirstName);
    formData.append('lastname', getLastName);
    formData.append('telephone', getTelephone);
    formData.append('email', getEmail);
    formData.append('social', getSocial);
    formData.append('color', getColor);

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        let n = Math.random()
        props.update(n)
        set_form_default()
      })
  }

  // retorna os valores do form para os padrão
  function set_form_default() {
    const firstname = 'Nome'
    const lastName = 'Sobrenome'
    const telephone = 'Telefone'
    const email = 'Email'
    const social = 'Rede social'
    setFirstName(firstname)
    setLastName(lastName)
    setTelephone(telephone)
    setEmail(email)
    setSocial(social)
    setColor('')
    document.getElementById("FirstnameInput").innerText = firstname
    document.getElementById("LastnameInput").innerText = lastName
    document.getElementById("TelephoneInput").innerText = telephone
    document.getElementById("EmailInput").innerText = email
    document.getElementById("SocialInput").innerText = social
  }


  return (
    <div className='contact-margin'>
      <div className='contact-card' style={{ background: getColor }}>
        <img className="contact-image" src="user.png" alt="profile"></img>
        <div className="div-align-contact-info">
          <a contentEditable='true' className="contact-title" id="FirstnameInput" onInput={saveFirstName}> {getFirstName} </a>
          <a contentEditable='true' className='contact-input' id="LastnameInput" onInput={saveLastName}> {getLastName} </a>
          <a contentEditable='true' className='contact-input' id="TelephoneInput" onInput={saveTelephone}> {getTelephone} </a>
          <a contentEditable='true' className='contact-input' id="EmailInput" onInput={saveEmail}> {getEmail} </a>
          <a contentEditable='true' className='contact-input' id="SocialInput" onInput={saveSocial}> {getSocial}</a>
        </div>
        <div className='contact-align-btns'>
          <a className="contact-save" onClick={save_contact} > <FontAwesomeIcon icon={faFloppyDisk} /></a>
          <input type="Color" className="contact-colorSelect" onChange={saveColor}></input>
        </div>
      </div>
    </div>
  )
}