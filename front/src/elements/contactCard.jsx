import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
import profileImg from '../media/profile.webp'


export default function ContactCard(props) {

  function open_whatsapp() {
    let number = props.data.telephone.replace('(', '').replace(')', '').replace('-', '')
    location.href = `https://api.whatsapp.com/send?phone=55${number}`
  }

  function email_to() {
    location.href = `mailto:${props.data.email}`
  }

  return (
    <div className='contact-card' style={{ backgroundColor: props.data['color'] }}>
      <div className="contact-div-title">
        <img className="contact-image" src={profileImg} alt="profile"></img>
        <a className='contact-title' type="Text" id="TitleInput">{props.data.firstname}</a>
      </div>
      <div className="div-align-contact-info">
        <p className='contact-input' id="LastnameInput" >{props.data.lastname}</p>
        <a className='contact-input' id="TelephoneInput" onClick={open_whatsapp} style={{ cursor: 'pointer' }}>{props.data.telephone}</a>
        <a className='contact-input' id="EmailInput" onClick={email_to} style={{ cursor: 'pointer' }}>{props.data.email}</a>
        <a className='contact-input' id="SocialInput" >{props.data.social}</a>
      </div>
      <div className='site-align-btns'>
        <a className='delete-btn' onClick={props.delete}> <FontAwesomeIcon icon="fa-solid fa-trash" /> </a>
      </div>
    </div>
  )
}