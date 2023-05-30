import { useState } from 'react';
import NavBar from './elements/navbar'
import './Home.css'


export default function App() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function to_login() {
    location.href = "/login/"
  }

  function to_notes() {
    if (getToken == undefined) {
      location.href = "/login/"
    } else {
      location.href = "/notes/"
    }
  }

  return (
    <>
      <NavBar></NavBar>

      <div className='page'>
        <a className='big-title'> Bem vindo ao NoteSpace </a>
        <p className='subtitle'> Salve suas ideias onde você estiver por que inspiração passa seus planos nâo...</p>
        <p> Não perca tempo e começe a guarda suas ideias</p>

        <div className='home-align-btns'>
          <button className='btn' onClick={to_login}>Começar a organizar sua vida</button>
          <button className='btn' onClick={to_notes}>Ver suas ideias salvas</button>
        </div>
      </div>

      <div className='page'>

        <a className='title'> Usar notas online ajuda</a>
        <p className='subtitle'>-Manter suas ideias acessíveis em qualquer lugar e qualquer dispositivo</p>
        <p className='subtitle'>-Manter suas ideias organizadas facilita sua vida</p>
        <p className='subtitle'>-BackUp de suas notas para não perder nada</p>
        <p className='subtitle'>-Reduz seu impacto ambiental salvando suas ideias sem gastar papel </p>
      </div>


      <div className='page'>
        <a className='title'> Sobre: </a>
        <p> Site para salvar notas, sites e contatos para facilitar sua vida</p>
        <p> Front end feito com <a href='https://react.dev/'>Reactjs</a> e <a href='https://vitejs.dev/'>Vite</a></p>
        <p> Back end feito com <a href='https://www.djangoproject.com/'>Django</a> e <a href='https://www.postgresql.org/'>PostgreSql</a></p>

        <a href="https://www.github.com/plotzzzky"> feito por plotzZzky, veja meu GitHub </a>

      </div>
    </>
  )
}
