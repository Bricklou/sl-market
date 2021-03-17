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

type NavBarState = {
  displayMenu: boolean
}
type NavBarProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps

class NavBar extends Component<NavBarProps, NavBarState> {
  private dropdownMenu?: HTMLUListElement | null

  constructor(props: NavBarProps) {
    super(props)
    this.state = {
      displayMenu: false,
    }
  }

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

  get userAvatar() {
    if (this.props.user) {
      return `https://cdn.discordapp.com/avatars/${this.props.user.id}/${this.props.user.avatar}.png`
    }
    return ''
  }

  private showAuthButton() {
    if (this.props.isAuthenticated) {
      return (
        <div className="navbar-dropdown">
          <span>
            <img className="avatar" src={this.userAvatar} alt="" />
            {this.props.user!.username}
            <i className="fas fa-caret-down"></i>
          </span>

          <ul className="dropdown" ref={(element) => (this.dropdownMenu = element)}>
            <li>
              <button onClick={this.logout.bind(this)}>Déconnexion</button>
            </li>
          </ul>
        </div>
      )
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
