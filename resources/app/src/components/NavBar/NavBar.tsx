import React, { Component } from 'react'
import './navbar.scss'
import logo from '../../assets/img/icon.svg'
import { Link, NavLink, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../store/modules/user'
import { withRouter } from 'react-router-dom'
import auth from '../../utils/auth'

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = { logout }

type NavBarProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps

class NavBar extends Component<NavBarProps> {
  private async logout(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    try {
      await auth.logout()
    } catch (error) {
      console.error(error)
    }

    this.props.logout()

    this.props.history.push('/')
  }

  private showAuthButton() {
    if (this.props.isAuthenticated) {
      return <button onClick={this.logout.bind(this)}>Déconnexion</button>
    } else {
      return (
        <a href={process.env.REACT_APP_DISCORD_OAUTH2_LINK} className="discord-btn button">
          <i className="fab fa-discord"></i>
          Authentification
        </a>
      )
    }
  }

  render(): JSX.Element {
    return (
      <nav id="navbar">
        <div className="nav-container">
          <Link to="/" className="logo-link">
            <span className="logo-container">
              <img src={logo} alt="Logo" />
            </span>
            <span className="title-container">SL-Market</span>
          </Link>

          <span className="menubar">
            <NavLink to="/vendeurs" activeClassName="active">
              vendeurs
            </NavLink>
            {this.showAuthButton()}
          </span>
        </div>
      </nav>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
