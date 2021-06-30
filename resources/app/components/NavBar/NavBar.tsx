import React, { Component } from 'react'
import './navbar.scss'
import logo from '@/assets/img/icon.svg'
import { Link, NavLink, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { logout, UserInfo } from '@/store/modules/user'
import { withRouter } from 'react-router-dom'
import auth from '@/utils/auth'
import Acl from '@/utils/Acl'
import { CombinedState } from 'redux'

/**
 * Fetch user informations from store
 */
const mapStateToProps = (
  state: RootState
): CombinedState<{ user?: UserInfo; isAuthenticated: boolean | null }> => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = { logout }

export type NavBarProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps

/**
 * Navbar component
 */
class NavBar extends Component<NavBarProps> {
  /**
   * Try to logout the user and redirect him to the home route
   */
  private async logout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault()

    try {
      await auth.logout()
    } catch (error) {
      console.error(error)
    }

    this.props.logout()

    this.props.history.push('/')
  }

  /**
   * If the user is authenticated and have permissions to access the seller panel, then render sellers links.
   */
  private showSellerLinks(): JSX.Element[] | undefined {
    if (this.props.user && Acl.can(this.props.user, ['access:sellerPanel'])) {
      const links = {
        '/mes-services': 'Mes services',
      }

      return Object.entries(links).map(([link, name], index) => {
        return (
          <li key={index}>
            <Link to={link}>{name}</Link>
          </li>
        )
      })
    }
  }

  /**
   * If user is authenticated and have permissions to access the admin panel, then render admin links
   */
  private showAdminLinks(): JSX.Element[] | undefined {
    if (this.props.user && Acl.can(this.props.user, ['access:adminPanel'])) {
      const links = {
        '/administration': 'Administration',
      }

      return Object.entries(links).map(([link, name], index) => {
        return (
          <NavLink to={link} activeClassName="active" key={index}>
            {name}
          </NavLink>
        )
      })
    }
  }

  /**
   * If the user is authenticated, show logout button and others links.
   * Otherwise, show an auth button.
   */
  private showAuthButton(): JSX.Element {
    if (this.props.isAuthenticated) {
      return (
        <div className="navbar-dropdown">
          <span>
            <img
              className="avatar"
              src={this.props.user!.avatar}
              alt=""
              data-testid="user-avatar"
            />
            {this.props.user!.username}
            <i className="fas fa-caret-down"></i>
          </span>

          <ul className="dropdown">
            {this.showSellerLinks()}
            <li>
              <Link to="/profil">Mon profil</Link>
            </li>
            <li>
              <button onClick={this.logout.bind(this)} data-testid="logout-btn">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <a href="/api/auth/redirect" className="discord-btn button">
          <i className="fab fa-discord"></i>
          Authentification
        </a>
      )
    }
  }

  public render(): JSX.Element {
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

            {this.showAdminLinks()}
            {this.showAuthButton()}
          </span>
        </div>
      </nav>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
