import { useState } from 'react';
import NavBar from './elements/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


export default function Home() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const faq = [
    { "question": "O que é o NoteSpace?", 
      "answer": "O NoteSpace é uma plataforma online que permite aos usuários salvar e organizar suas notas, favoritos de sites e contatos de maneira fácil e conveniente." },
    { "question": "Como posso salvar minhas notas no NotSpace?", 
      "answer": "Para salvar suas notas, faça login na sua conta NoteSpace e acesse a seção de notas. Lá, você pode criar uma nova nota, inserir o conteúdo desejado e salvar." },
    { "question": " É possível acessar minhas notas, favoritos e contatos em diferentes dispositivos?", 
      "answer": "Sim, com a versão premium do NoteSpace, você pode sincronizar suas informações entre diferentes dispositivos, permitindo acesso a suas notas, favoritos e contatos em qualquer lugar, a qualquer momento." },
    { "question": "O NoteSpace é gratuito?", 
      "answer": "Sim, o NoteSpace oferece uma versão gratuita com recursos básicos de salvamento de notas, favoritos e contatos. No entanto, há também uma versão premium que oferece funcionalidades avançadas, como sincronização entre dispositivos e armazenamento adicional." },
    { "question": "Como faço para entrar em contato com o suporte do NoteSpace se tiver alguma dúvida ou problema?", 
      "answer": "Para obter suporte, você pode entrar em contato conosco através da seção de Suporte em nosso site. Nossa equipe estará feliz em ajudar você com qualquer dúvida ou problema que possa ter." },
  ]

  const faqItems = () => {
    return faq.map((data) => (
      <details>
        <summary> {data.question} </summary>
        <p className='details-text'> {data.answer} </p>
      </details>
    ))
  }

  function go_login(){
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      location.pathname = "/notes/"
    }
  }


  function go_notes() {
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      location.pathname = "/notes/"
    }
  }

  function go_github(){
    location.pathname = "https://github.com/plotzzzky"
  }

  return (
    <>
      <NavBar></NavBar>

      <div className='page'>
        <a className='big-title'> Bem vindo ao NoteSpace </a>
        <p className='subtitle'> Salve suas ideias onde você estiver por que inspiração passa seus planos nâo...</p>
        <p className='subtitle'> Não perca tempo e começe a guarda suas ideias</p>

        <div className='home-align-btns'>
          <button className='btn' onClick={go_login}>Começar a organizar sua vida</button>
          <button className='btn' onClick={go_notes}>Ver suas ideias salvas</button>
        </div>
      </div>

      <div className='page'>

        <a className='title'> Benefícios: </a>

        <p className='subtitle'>-Manter suas ideias acessíveis em qualquer lugar e qualquer dispositivo</p>
        <p className='subtitle'>-Manter suas ideias organizadas facilita sua vida</p>
        <p className='subtitle'>-BackUp de suas notas para não perder nada</p>
        <p className='subtitle'>-Reduz seu impacto ambiental salvando suas ideias sem gastar papel </p>
      </div>

      <div className='page' id='Faq'>
        <a className='title'> Duvias frequentes: </a>
        {faqItems()}
      </div>

      <footer id="footer">
        <p className="link" onClick={go_github}>
          <FontAwesomeIcon icon={faGithub} />
          <a> GitHub </a>
        </p>

      </footer>
    </>
  )
}
