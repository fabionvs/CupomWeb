import React from 'react'
import './Footer.css';



export const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-4 text-start">
            <p className="mb-0">
              <a
                className="text-muted"
                href="/"
                target=""
              >
                <strong>SISRH</strong>
              </a>{" "}
              ©
            </p>

          </div>
          <div className="col-4 text-start">
            <p className="mb-0">
              Base URL: {process.env.REACT_APP_ENV}
            </p>
          </div>
          <div className="col-4 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="/"
                  target=""
                >
                  Suporte
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="/"
                  target=""
                >
                  Manual
                </a>
              </li>
            </ul>
          </div>





        </div>
      </div>
    </footer>
  )
}
export default Footer;