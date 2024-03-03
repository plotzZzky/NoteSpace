'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import SiteCard from "@comps/siteCard";
import { useAuth } from '@comps/authContext'

export default function Sites() {
  const [getToken, setToken] = useAuth();
  const router = useRouter();

  const [getSitesCard, setSitesCard] = useState([]);

  const [getTitle, setTitle] = useState("Nome do site");
  const [getUrl, setUrl] = useState("https://www.example.com/");
  const [getColor, setColor] = useState("");

  function checkLogin() {
    if (getToken !== null && typeof getToken === 'string') {
      getAllSites();
    } else {
      router.push("/login/");
    }
  };

  // Sites
  function getAllSites() {
    let url = "http://127.0.0.1:8000/sites/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken}
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { createSitesCard(data) }
      )
  }

  function createSitesCard(sites, index) {
    setSitesCard(
      sites.map((data) => (
        <SiteCard key={index} data={data} update={getAllSites} ></SiteCard>))
    )
  }

  function saveNewSite() {
    let url = "http://127.0.0.1:8000/sites/"
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
        setFormDefault();
        getAllSites();
      });
  }

  // retorna os valores do form para os padrão
  function setFormDefault() {
    setTitle("Nome do site")
    setUrl("Url do site")
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
    setUrl(value)
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
      <div className="page">
        <div className="cards">
        <div className="site-margin">
          <div className='site-card' style={{background: getColor}}>
            <a contentEditable='true' className='site-title' id="TitleInput" onInput={setTitle}> {getTitle} </a>
            <a contentEditable='true' className='url-input' id="UrlInput" onInput={setUrl}> {getUrl} </a>
            <div className='site-align-btns'>
              <a className="site-save" onClick={saveNewSite} > <FontAwesomeIcon icon={faFloppyDisk} /></a>
              <input type="Color" className="site-colorSelect" onChange={changeColor}></input>
            </div>
          </div>
        </div>

          {getSitesCard}
        </div>
      </div>
    </>
  )
}