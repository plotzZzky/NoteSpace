import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import NavBar from "../elements/navbar";
import SiteCard from "../elements/siteCard";


export default function Sites() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getSites, setSites] = useState([]);

  const [getTitle, setTitle] = useState('Site');
  const [getUrl, setUrl] = useState('https://www.example.com');
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
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { create_sites_card(data['sites']) }
      )
  }

  function create_sites_card(sites) {
    setSites(sites.map((data) => (
      <SiteCard key={data.id} data={data} update={get_all_sites}></SiteCard>
      )))
  }

  function save_site() {
    let url = "http://127.0.0.1:8000/sites/new/"

    const formData = new FormData();
    formData.append("title", getTitle);
    formData.append("url", getUrl);
    formData.append("color", getColor)

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, data)
      .then(() => {
        set_form_default()
        get_all_sites()
      })
  }

  // retorna os valores do form para os padrão
  function set_form_default() {
    const title = 'Nome do site'
    const url = 'https://www.example.com'
    setTitle(title)
    setUrl(url)
    setColor('')
    document.getElementById("TitleInput").innerText = title
    document.getElementById("UrlInput").innerText = url
  }

  // Sets
  function set_title(event) {
    const value = event.target.textContent
    setTitle(value)
  }

  function set_url(event) {
    const value = event.target.textContent
    setUrl(value)
  }

  function change_color(event) {
    const value = event.target.value
    setColor(value)
  }

  useEffect(() => {
    check_login()
  }, []);


  return (
    <>
      <NavBar></NavBar>

      <div className="page">
        <div className="cards-div">

        <div className="site-margin">
          <div className='site-card' style={{background: getColor}}>
            <a contentEditable='true' className='site-title' id="TitleInput" onInput={set_title}> {getTitle} </a>
            <a contentEditable='true' className='url-input' id="UrlInput" onInput={set_url}> {getUrl} </a>
            <div className='site-align-btns'>
              <a className="site-save" onClick={save_site} > <FontAwesomeIcon icon={faFloppyDisk} /></a>
              <input type="Color" className="site-colorSelect" onChange={change_color}></input>
            </div>
          </div>
        </div>

          {getSites}

        </div>
      </div>
    </>
  )
}