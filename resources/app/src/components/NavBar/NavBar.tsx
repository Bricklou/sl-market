import React, { Component } from 'react'
import './navbar.scss'
import logo from '../../assets/img/icon.svg'

export default class NavBar extends Component {
  render() {
    return (
      <nav className="design" id="navbar">
        <div className="container">
          <a href="/" className="logo-link">
            <span className="logo-container">
              <img src={logo} alt="Logo" />
            </span>
            <span className="title-container">SL-Market</span>
          </a>

          <span className="menubar">
            <a href="/vendeurs">vendeurs</a>
          </span>
        </div>
      </nav>
    )
  }
}
