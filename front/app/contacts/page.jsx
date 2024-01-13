'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../elements/navbar";
import ContactCard from "../elements/contactCard";
import ContactForm from "../elements/contactForm";


export default function Contacts() {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : null);
  const router = useRouter();

  const [getContactsCard, setContactsCard] = useState([]);

  const [getTitle, setTitle] = useState('Titulo da nota');
  const [getText, setText] = useState('Nota de test');
  const [getColor, setColor] = useState("");

  function checkLogin() {
    if (getToken !== null && typeof getToken === 'string') {
      getAllContacts()
    } else {
      router.push("/login/");
    }
  }

  // Contacts
  function getAllContacts() {
    let url = "http://127.0.0.1:8000/contacts/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken}
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { createContactsCard(data['contacts']) }
      )
  }

  function createContactsCard(contacts) {
    setContactsCard(
      contacts.map((data) => (
        <ContactCard key={data.id} data={data} update={getAllContacts} ></ContactCard>))
    )
  }

  function saveNewContacts() {
    let url = "http://127.0.0.1:8000/contacts/new/"
    const formData = new FormData();
    formData.append("title", getTitle);
    formData.append("text", getText);
    formData.append("color", getColor)

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        setFormDefault();
        getAllContacts();
      });
  }

  // retorna os valores do form para os padrão
  function setFormDefault() {
    setTitle('Titulo da nota')
    setText('Nota de teste')
    setColor('')
    document.getElementById("TitleInput").innerText = getTitle
  }

  // Sets
  function changeTitle(event) {
    const value = event.target.textContent
    changeTitle(value)
  }

  function changeText(event) {
    const value = event.target.value
    setText(value)
  }

  function changeColor(event) {
    const value = event.target.value
    setColor(value)
  }

  useEffect(() => {
    checkLogin()
  }, []);


  return (
    <>
      <NavBar></NavBar>

      <div className="page">
        <div className="cards">
          <ContactForm Token={getToken} update={getAllContacts}></ContactForm>

          {getContactsCard}
        </div>
      </div>
    </>
  )
}