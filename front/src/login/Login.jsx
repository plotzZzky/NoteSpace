import { useState, useEffect } from 'react';
import NavBar from "../elements/navbar";
import InputPwd from '../elements/inputs/inputPwd';
import InputEmail from '../elements/inputs/inputEmail';
import InputUser from '../elements/inputs/inputUser';


export default function Login() {
  const [getLogin, setLogin] = useState(true);
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const [getUsername, setUsername] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getpwd, setPwd] = useState("")

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)

  function check_login() {
    if (getToken != undefined) {
      location.href = "/notes/";
    }
  }

  function show_login() {
    let login = document.getElementById('loginTab');
    let signup = document.getElementById('signupTab');
    login.style.display = getLogin? 'none' : 'flex'
    signup.style.display = getLogin? 'flex' : 'none'
    setLogin(getLogin? false : true)
  }

  function check_if_login_valid() {
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("LoginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  function loginFunc() {
    let url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword)
    let info = {method: 'POST',
                body: formData}

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("LoginTip")
          tip.innerText = data.error
        } else {
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
        }
    })
  }

  function check_if_sign_valid() {
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("SignTip")
      tip.innerText = "Prencha os dados para se registar"
    }
  }

  function SignUpFunc() {
      let url = `http://127.0.0.1:8000/users/register/`

      const formData = new FormData();
      formData.append("username", getUsername);
      formData.append("email", getEmail);
      formData.append("password", getPassword);
      formData.append("pwd", getpwd);

      const info = {method: 'POST', body: formData}

      fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("SignTip")
          tip.innerText = data.error
        } else {
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
        }
      })
  }


  useEffect(() => {
    check_login()
  }, [getToken]);


  return (
    <div className='page banner'>
      <NavBar></NavBar>

      <div className="login-page">
        <div className='login-div' id='loginTab'>
          <p className='login-title'> Bem vindo de volta!</p>

          <div className='align-input'>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='LoginTip'></InputUser>
            <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='LoginTip'></InputPwd>
          </div>

          <a className='login-tip' id='LoginTip'> </a>

          <button className='btn btn-login' onClick={check_if_login_valid}> Entrar </button>

          <p className='login-text-link' onClick={show_login}> Cadastre-se</p>
        </div>

        <div className='login-div' id='signupTab' style={{display: 'none'}}>
          <p className='login-title'> Junte-se a nós! </p>

          <div className='align-input'>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='SignTip'></InputUser>
            <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='SignTip'></InputEmail>
            <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='SignTip'></InputPwd>
            <InputPwd password={setPwd} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a senha" tip='SignTip'></InputPwd>
          </div>

          <a className='login-tip' id='SignTip'> </a>

          <button className='btn btn-login' onClick={check_if_sign_valid}> Cadastrar </button>

          <p className='login-text-link' onClick={show_login}> Entrar </p>
        </div>
      </div>
    </div>

  )
}