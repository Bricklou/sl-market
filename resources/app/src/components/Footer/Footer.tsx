import React, { Component } from 'react'
import './footer.scss'
import '../../components/base/Button/button.scss'

/**
 * Footer component
 */
export default class Footer extends Component {
  public render(): JSX.Element {
    return (
      <footer id="footer">
        <section className="footer-content">
          <article>
            <p className="column-title">Politique du site</p>
          </article>
          <article>
            <p className="column-title">Rejoindre le discord</p>
            <ul>
              <li>
                <a href={process.env.REACT_APP_DISCORD_LINK} className="button discord-btn-invert">
                  <i className="fab fa-discord"></i>
                  Discord
                </a>
              </li>
              <li>
                <a href={process.env.REACT_APP_GITHUB_LINK} className="button github-button">
                  <i className="fab fa-github"></i>
                  Github
                </a>
              </li>
            </ul>
          </article>
        </section>
        <section className="footer-bottom">
          <span>© 2021 ─ SL-Market</span>
        </section>
      </footer>
    )
  }
}
