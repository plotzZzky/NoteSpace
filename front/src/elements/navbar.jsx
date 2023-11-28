import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faHouse, faUser, faAddressBook, faEarthAmerica, faBars } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'


export default function NavBar() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function open_menu() {
    let navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive")
    } else {
      navbar.className = "menu"
    }
  }

  function close_menu() {
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.classList.remove("responsive")
  }

  // Function to go
  function go_home() {
    if (location.pathname != '/') {
    location.href = "/"
    }
    close_menu()
  }

  function go_notes() {
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      if (location.pathname != '/notes/') {
      location.pathname = "/notes/"
      }
    }
    close_menu()
  }

  function go_sites() {
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      if (location.pathname != '/websites/') {
      location.pathname = "/websites/"
      }
    }
    close_menu()
  }

  function go_contacts() {
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      if (location.pathname != '/contacts/') {
      location.pathname = "/contacts/"
      }
    }
    close_menu()
  }

  function go_login(){
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      location.pathname = "/notes/"
    }
    close_menu()
  }

  return (
    <div className="navbar">

      <div className='navbar-align'>
        <div className="brand" onClick={go_home}>
          <i className={faHouse}></i>
          <a className="brand-name"> <FontAwesomeIcon icon={faNoteSticky} className='icon-menu' /> NoteSpace</a>
        </div>


        <div className="menu" id="menu">
          <a className="menu-icon" onClick={open_menu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={go_home}>
            <a><FontAwesomeIcon icon={faHouse} className='icon-menu' /> Inicio </a>
          </div>

          <div className="menu-item" onClick={go_notes}>
            <a><FontAwesomeIcon icon={faNoteSticky} className='icon-menu' /> Notas </a>
          </div>

          <div className="menu-item" onClick={go_sites}>
            <a><FontAwesomeIcon icon={faEarthAmerica} className='icon-menu' /> Sites </a>
          </div>

          <div className="menu-item" onClick={go_contacts}>
            <a><FontAwesomeIcon icon={faAddressBook} className='icon-menu' /> Contatos </a>
          </div>

          <div className="menu-item" onClick={go_login}>
            <a><FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar </a>
          </div>

        </div>
      </div>
    </div>
  )
}