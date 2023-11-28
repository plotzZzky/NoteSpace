import { useState, useEffect } from "react";
import NavBar from "../elements/navbar";
import ContactCard from "../elements/contactCard";
import ContactForm from "../elements/contactForm";


export default function Contacts() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getContacts, setContacts] = useState([]);

  function check_login() {
    if (getToken == undefined) {
      window.location.replace("/login/");
    } else {
      get_all_contacts();
    }
  }

  // Contatos
  function get_all_contacts() {
    let url = "http://127.0.0.1:8000/contacts/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { create_contacts_card(data['contacts']) })
  }

  function create_contacts_card(contacts) {
    setContacts(contacts.map((data) => (
      <ContactCard key={data.id} data={data} update={get_all_contacts}></ContactCard>
      )))
  }

  useEffect(() => {
    check_login()
  }, []);


  return (
    <>
      <NavBar></NavBar>

      <div className="page">
        <div className="cards-div">
          <ContactForm Token={getToken} update={get_all_contacts}></ContactForm>

          {getContacts}

        </div>
      </div>
    </>
  )
}