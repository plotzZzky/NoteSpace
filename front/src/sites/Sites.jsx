import { useState, useEffect, SetState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave, faEarthAmerica } from '@fortawesome/free-solid-svg-icons'

library.add(faSave, faEarthAmerica)

import NavBar from "../elements/navbar";
import SiteCard from "../elements/siteCard";
import './Sites.css'


export default function Sites() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));
    const [getSites, setSites] = useState([]);
    const [getColor, setColor] = useState("");

    function check_login() {
        if (getToken == undefined) {
            window.location.replace("/login/");
        } else {
            get_all_sites();
        }
    }

    // Sites
    function get_all_sites() {
        let url = "http://127.0.0.1:8000/sites/"
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then((res) => res.json())
        .then((data) =>{ setSites(data['sites'])}
        )
    }

    function save_site() {
        let url = "http://127.0.0.1:8000/sites/new/"
        let title = document.getElementById("TitleInput").innerHTML
        let url_text = document.getElementById("UrlInput").innerHTML
        let json = {
            'title': title,
            'url': url_text,
            'color': getColor,
        }
        let data = {    method: 'POST', 
                        headers: {'Content-Type':'application/json',
                        Authorization: 'Token ' + getToken},
                        body: JSON.stringify(json)
                    }
        fetch(url, data)
        .then((reponse) => reponse.json())
        .then((data) => {
            alert(data.text)
            get_all_sites()
        })
    }

    function delete_site(site_id) {
        let url = `http://127.0.0.1:8000/sites/delete/id=${site_id}`
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}
                    }
        fetch(url, data)
        .then((reponse) => reponse.json())
        .then((data) => {
            alert(data.text)
            get_all_sites()
        })
    }

    useEffect( () => {
        check_login()
    }, []);


    return (
        <>
            <NavBar></NavBar>

            <div className="page">
                <div className="sites-div">

                    <div className='site-card'>
                        <div className="site-div-title">
                            <i src="" />
                            <a contentEditable="true" className='site-title' type="Text" id="TitleInput"> Titulo </a>
                        </div>
                        <a className='url-input' contentEditable="true" id="UrlInput" > https://www.example.com</a>
                        <div className='site-align-btns'>
                            <a className="site-save" onClick={() => save_site()} > <FontAwesomeIcon icon="fa-solid fa-floppy-disk fa-xl" /></a>
                            <input type="Color" className="site-colorSelect" onChange={(e) => setColor(e.target.value)}></input>
                        </div>
                    </div>

                    {getSites.map((data) => (
                        <SiteCard key={data.id} data={data} delete={() => delete_site(data["id"])}></SiteCard>))}
                </div>
            </div>
        </>
    )
}