'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContactCard from "@comps/contactCard";
import ContactForm from "@comps/contactForm";
import { useAuth } from '@comps/authContext'

export default function Contacts() {
  const [getToken, setToken] = useAuth();
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
    const url = "http://127.0.0.1:8000/contacts/"
    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken}
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { createContactsCard(data) }
      )
  }

  function createContactsCard(contacts) {
    setContactsCard(
      contacts.map((data) => (
        <ContactCard key={data.id} data={data} update={getAllContacts} ></ContactCard>))
    )
  }

  useEffect(() => {
    checkLogin()
  }, []);


  return (
    <>
      <div className="page">
        <div className="cards">
          <ContactForm Token={getToken} update={getAllContacts}></ContactForm>

          {getContactsCard}
        </div>
      </div>
    </>
  )
}