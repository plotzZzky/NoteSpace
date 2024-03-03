'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faHome, faQuestion, faUsers, faNoteSticky, faEarthAmerica, faAddressBook, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@comps/authContext'
import './navbar.css'


export default function NavBar() {
  const [token, updateToken] = useAuth();
  const router = useRouter();
  const getPath = usePathname();

  // Função que abre o menu no modo responsivo
  function openResponsiveMenu() {
    const navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive");
    } else {
      navbar.className = "menu";
    }
  };

  // Função que fecha o menu no modo responsivo
  function closeResponsiveMenu() {
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.classList.remove("responsive");
  };

  // Criam os item na navbar dependendo da pagina acessada
  const ABOUT = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goAbout}>
        <a><FontAwesomeIcon icon={faUsers} className='icon-menu' /> Sobre </a>
      </div>
    ) : null
  };

  const FAQ = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goFaq}>
        <a><FontAwesomeIcon icon={faQuestion} className='icon-menu' /> Dúvidas </a>
      </div>
    ) : null
  };

  const LOGIN = () => {
    return token === null? (
      <div className="menu-item" onClick={goLogin}>
        <a><FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar </a>
      </div>
    ) : (
      <div className="menu-item" onClick={goLogin}>
        <a><FontAwesomeIcon icon={faRightFromBracket} className='icon-menu' /> Sair </a>
      </div>
    )
  };

  //Funções de navegação pelas paginas
  function goHome() {
    if (getPath === '/') {
      document.getElementById('Start').scrollIntoView();
    } else {
      router.push('/');
    }
    closeResponsiveMenu();
  };

  function goAbout() {
    document.getElementById('About').scrollIntoView();
    closeResponsiveMenu();
  }

  function goFaq() {
    document.getElementById('Faq').scrollIntoView();
    closeResponsiveMenu();
  }

  //Função generica para redirecionamento, se tokne for null redireciona para /login do contrario para a pagina passada como parametro
  function genericGoTo(value) {
    if (token !== null && typeof token === 'string') {
      if (getPath !== value) {
        router.push(value);
      }
    } else {
      if (getPath === "/login") {
        showLoginAlert()
      } else {
        router.push("/login");
      }
    }
    closeResponsiveMenu();
  };

  function goNotes() {
    genericGoTo("/notes")
  };

  function goSites() {
    genericGoTo("/sites")
  };

  function goContacts() {
    genericGoTo("/contacts")
  };

  // Faz logout no front
  function goLogin() {
    if (token === null) {
      router.push("/login")
    } else {
      sessionStorage.removeItem("token")
      updateToken(null)
      router.push('/')
    }
  }

  // Mostra o alerta de login
  function showLoginAlert() {
    const alert = document.getElementById('loginAlert');
    alert.style.visibility = 'visible';
    setTimeout(() => {
      alert.style.visibility = 'hidden';
    }, 2000);
  }

  useEffect(() => {
    updateToken(sessionStorage.getItem('token') || null)
  }, [])

  return (
    <nav>
      <div className='navbar-align'>
        <div className="menu" id="menu">

          <a className="menu-icon" onClick={openResponsiveMenu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={goHome}>
            <a><FontAwesomeIcon icon={faHome} /> Inicio </a>
          </div>

          {ABOUT()}

          {FAQ()}

          <div className="menu-item" onClick={goNotes}>
            <a><FontAwesomeIcon icon={faNoteSticky} /> Notas </a>
          </div>

          <div className="menu-item" onClick={goSites}>
            <a><FontAwesomeIcon icon={faEarthAmerica} /> Sites </a>
          </div>

          <div className="menu-item" onClick={goContacts}>
            <a><FontAwesomeIcon icon={faAddressBook} /> Contatos </a>
          </div>

          {LOGIN()}

        </div>
      </div>
    </nav>
  )
}