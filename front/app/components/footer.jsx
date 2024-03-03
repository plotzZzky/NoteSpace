'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faNoteSticky } from "@fortawesome/free-solid-svg-icons"


export default function Footer() {

  function goToGitHub() { router.push("https://github.com/plotzzzky") }

  return(
    <footer id="footer">
      <span className="brand"> NoteSpace <FontAwesomeIcon icon={faNoteSticky} /> </span>

      <div className="align-footer">

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a> contato@shopzen.com</a>
        </div>

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a> adm@shopzen.com</a>
        </div>

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> github.com/dev </a>
        </div>

      </div>
    </footer>  
  )
}