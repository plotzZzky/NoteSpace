import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'


export default function InputEmail(props) {

  function update_tip_login_password() {
    const tip = document.getElementById(props.tip)
    tip.innerText = "O email precisa ser valido"
  }

  const validate_email = (event) => {
    const value = event.target.value;
    if (value.includes('@') && value.includes("mail.com")) {
      props.setValid(true)
      props.email(value)
    } else {
      props.setValid(false)
    }
  }

  useEffect(() => {
    const fakeEvent = { target: { value: props.value || '' } };
    validate_email(fakeEvent)
  }, [props.value])

  
  return (
    <div className='div-input'>
      <input
        className='text-input' type='email' name='email' placeholder='Digite seu email'
        onChange={validate_email} onFocus={update_tip_login_password} value={props.value} >
      </input>
      <span className='input-div-icon'> {props.valid ?
        <FontAwesomeIcon icon={faCheck} className='icon-input-validate' /> :
        <FontAwesomeIcon icon={faX} className='icon-input' />
      }
      </span>
    </div>
  )
}