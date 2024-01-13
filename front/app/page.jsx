'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import NavBar from './elements/navbar'


export default function Home() {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);
  const router = useRouter();

  const FAQ = [
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

  // Cria os items do faq
  const faqItems = () => {
    return FAQ.map((data, index) => (
      <details key={index}>
        <summary> {data.question} </summary>
        <a className='details-text'> {data.answer} </a>
      </details>
    ))
  }

  function goToLogin() {
    if (getToken === undefined) {
      router.push("/login");
    } else {
      router.push("/notes");
    }
  }

  function goToGitHub() { router.push("https://github.com/plotzzzky") }

  return (
    <>
      <NavBar></NavBar>

      <div className='page-home' id='Start'>
        <h1 className='big-title'> Bem vindo ao NoteSpace </h1>
        <h2> Salve suas ideias onde você estiver por que inspiração passa seus planos nâo...</h2>
        <h2> Não perca tempo e começe a guarda suas ideias </h2>

        <div className='home-align-btns'>
          <button className='btn' onClick={goToLogin}> Começar a organizar sua vida </button>
        </div>
      </div>

      <div className='page-home' id='About'>

        <h1> Benefícios: </h1>

        <p> - Manter suas ideias acessíveis em qualquer lugar e qualquer dispositivo</p>
        <p> - Manter suas ideias organizadas facilita sua vida</p>
        <p> - BackUp de suas notas para não perder nada</p>
        <p> - Reduz seu impacto ambiental salvando suas ideias sem gastar papel </p>
      </div>

      <div className='page-home' id='Faq'>
        <h1> Duvias frequentes: </h1>
        {faqItems()}
      </div>

      <footer id="footer">
        <p className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> GitHub </a>
        </p>
      </footer>
    </>
  )
}