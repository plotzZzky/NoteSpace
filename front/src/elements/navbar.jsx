import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNoteSticky, faHouse, faUser, faAddressBook, faEarthAmerica, faBars } from '@fortawesome/free-solid-svg-icons'


import './navbar.css'

library.add(faNoteSticky, faHouse, faUser, faAddressBook, faEarthAmerica, faBars)


export default function NavBar() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));

    function OpenMenu() {
        let navbar = document.getElementsByClassName("menu")[0];
        if (navbar.className == "menu") {
            navbar.classList.add("responsive")
        } else {
            navbar.className = "menu"
        }
      }

    function go_notes() {
        if (getToken == undefined) {
            location.href = "/login/"
        } else {
            location.href = "/notes/"
        }
    }

    function go_sites() {
        if (getToken == undefined) {
            location.href = "/login/"
        } else {
            location.href = "/sites/"
        }
    }

    function go_contacts() {
        if (getToken == undefined) {
            location.href = "/login/"
        } else {
            location.href = "/contacts/"
        }
    }

    return (
        <div className="navbar">

            <div className='navbar-align'>
                <div className="brand" onClick={() => location.href="/"}>
                    <i className="fa-solid fa-house"></i>
                    <a className="brand-name"> <FontAwesomeIcon icon="fa-solid fa-note-sticky" className='icon-menu'/> NoteSpace</a>
                </div>


                <div className="menu" id="menu">
                    <a className="menu-icon" onClick={OpenMenu}>
                    <FontAwesomeIcon icon="fa-solid fa-bars fa-2xl" />
                    </a>

                    <div className="menu-item" onClick={() => location.href="/"}>
                        <a><FontAwesomeIcon icon="fa-solid fa-house icon-menu" className='icon-menu'/> Inicio </a>
                    </div>

                    <div className="menu-item" onClick={go_notes}>
                        <a><FontAwesomeIcon icon="fa-solid fa-note-sticky" className='icon-menu'/> Notas </a>
                    </div>

                    <div className="menu-item" onClick={go_sites}>
                        <a><FontAwesomeIcon icon="fa-solid fa-earth-americas" className='icon-menu'/> Sites </a>
                    </div>

                    <div className="menu-item" onClick={go_contacts}>
                        <a><FontAwesomeIcon icon="fa-solid fa-address-book" className='icon-menu'/> Contatos </a>
                    </div>

                    <div className="menu-item" onClick={() => location.href="/login/"}>
                        <a><FontAwesomeIcon icon="fa-solid fa-user" className='icon-menu'/> Entrar </a>
                    </div>

                </div>
            </div>
        </div>
    )
}