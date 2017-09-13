import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer className='footer-container'>
          <ul>
            <li>
              <i  className="fa fa-flask fa-lg"
                  aria-hidden="true"></i>
              <a  target="_blank"
                  href="http://icahn.mssm.edu/research/portal/resources/deans-cores/human-immune-monitoring-core"
                  className='footer-link'>
                  HIMC</a>
            </li>
            <li>
              <div>
                <i  className="fa fa-bug fa-2x"
                    aria-hidden="true">
                </i>
                <p>Report Bug</p>
              </div>
              <div className="computational-team-contact">
                <i  className="fa fa-envelope fa-lg"
                    aria-hidden="true">
                </i>
                <a  href='mailto:nicolas.fernandez@mssm.edu;melanie.davila@mssm.edu'
                    className='footer-link'>
                    Nick & Melanie
                </a>
              </div>
            </li>
          </ul>
      </footer>
    );
  }
}

export default Footer;
