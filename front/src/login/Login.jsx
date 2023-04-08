import React from 'react'
import { useState, useEffect } from 'react';


import NavBar from "../elements/navbar";
import './login.css'


export default function About() {
    const [getLogin, setLogin] = useState(true);
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));

    const [getUsername, setUsername] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword1, setPassword1] = useState("");
    const [getPassword2, setPassword2] = useState("")


    function check_login() {
        if (getToken != undefined) {
            location.href = "/notes/";
        } 
    }

    function show_login() {
        let login = document.getElementById('loginTab');
        let signup = document.getElementById('signupTab');
        if (getLogin === true) {
            login.style.display = "none";
            signup.style.display = "block";
            setLogin(false)
        } else {
            login.style.display = "block";
            signup.style.display = "none";
            setLogin(true)
        }
    }

    function loginFunc() {
        let url = `http://127.0.0.1:8000/users/login/`
        let json = {
            "username": getUsername,
            "password": getPassword1
        }
        fetch(url, {method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(json)})
                .then((res) => res.json())
                .then((data) => {
                    sessionStorage.setItem("token", data["token"])
                    setToken(sessionStorage.getItem("token"))
                })
      }

      function SignUpFunc() {
        let url = `http://127.0.0.1:8000/users/register/`
        let json = {
            "username": getUsername,
            "email": getEmail,
            "password1": getPassword1,
            "password2": getPassword2,
        }
        fetch(url, {method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(json)})
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("token", data["token"])
                    setToken(sessionStorage.getItem("token"))
                })     
      }  

    useEffect(() => {
        check_login()
    }, [getToken]);


    return (
        <>
            <NavBar></NavBar>

            <div className="page">
                <div className='login-div' id='loginTab'>
                    <p className='login-title'> Entrar </p>
                    
                    <input className='text-input' type='Text' name='username' placeholder='Nome do usuario' onChange={(e) => setUsername(e.target.value)}></input>
                    <input className='text-input' type='password' name='password' placeholder='Senha do usuario' onChange={(e) => setPassword1(e.target.value)}></input>
                    <button className='btn' onClick={loginFunc}> Entrar </button>

                    <p className='login-text-link' onClick={show_login}> Cadastre-se</p>
                </div>

                <div className='login-div' id='signupTab' style={{display: 'none'}}>
                    <p className='login-title'> Cadastrar </p>

                    <input className='text-input' type='Text' name='username' placeholder='Nome do usuario' onChange={(e) => setUsername(e.target.value)}></input>
                    <input className='text-input' type='Email' name='email' placeholder='Email do usuario' onChange={(e) => setEmail(e.target.value)}></input>
                    <input className='text-input' type='password' name='password' placeholder='Senha do usuario' onChange={(e) => setPassword1(e.target.value)}></input>
                    <input className='text-input' type='password' name='password' placeholder='Confirme a senha' onChange={(e) => setPassword2(e.target.value)}></input>
                    <button className='btn' onClick={SignUpFunc}> Cadastrar </button>

                    <p className='login-text-link' onClick={show_login}> Entrar</p>
                </div>
            </div>
        </>

    )
}