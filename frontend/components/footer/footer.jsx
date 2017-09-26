import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer className='footer-container'>
          <div className='phantom' />
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
              <i  className="fa fa-bug fa-lg"
                  aria-hidden="true">
              </i>
              <a  href='mailto:nicolas.fernandez@mssm.edu;melanie.davila@mssm.edu'
                  className='footer-link'>
                  Report Bug
              </a>
            </li>
          </ul>
      </footer>
    );
  }
}

export default Footer;
