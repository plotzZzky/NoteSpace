import { useState, useEffect, SetState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave, faEarthAmerica } from '@fortawesome/free-solid-svg-icons'
import profileImg from '../media/profile.webp'

library.add(faSave, faEarthAmerica)

import NavBar from "../elements/navbar";
import ContactCard from "../elements/contactCard";
import ContactForm from "../elements/contactForm";
import './Contacts.css'


export default function Contacts() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));
    const [getContacts, setContacts] = useState([]);
    const [getUpdate, setUpdate] = useState("");

    function check_login() {
        if (getToken == undefined) {
            window.location.replace("/login/");
        } else {
            get_all_contacts();
        }
    }

    // Sites
    function get_all_contacts() {
        let url = "http://127.0.0.1:8000/contacts/"
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then((res) => res.json())
        .then((data) =>{ setContacts(data['contacts']) })
    }

    function delete_contact(contact_id) {
        let url = `http://127.0.0.1:8000/contacts/delete/id=${contact_id}`
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}
                    }
        fetch(url, data)
        .then((reponse) => reponse.json())
        .then((data) => {
            alert(data.text)
            get_all_contacts()
        })
    }
            

    useEffect( () => {
        check_login()
    }, [getUpdate]);


    return (
        <>
            <NavBar></NavBar>

            <div className="page">
                <div className="contacts-div">
                    <ContactForm Token={getToken} update={setUpdate}></ContactForm>

                    {getContacts.map((data) => (
                        <ContactCard key={data.id} data={data} delete={() => delete_contact(data["id"])}></ContactCard>))}
                </div>
            </div>
        </>
    )
}