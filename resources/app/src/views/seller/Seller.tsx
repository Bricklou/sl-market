import { Component } from 'react'
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom'
import './seller.scss'

import SellerHome from './Home/Home'
import NotFound from '../base/not_found/NotFound'
import api from '../../utils/api'

interface SellerState {
  dropOpened: boolean
  status?: 'available' | 'unavailable' | 'vacation'
}

interface ApiStatusResponse {
  status: 'available' | 'unavailable' | 'vacation'
}

/**
 * Seller panel layout page
 */
class Seller extends Component<RouteComponentProps, SellerState> {
  public state: SellerState = {
    dropOpened: false,
  }

  /**
   * Fetch the seller status when the page is loaded
   */
  public async componentDidMount(): Promise<void> {
    try {
      const response = await api.get<ApiStatusResponse>('/seller/status')

      this.setState({
        status: response.data.status,
      })
    } catch (error) {
      console.error(error)
    }
  }

  private toggleStatusButton(): void {
    this.setState({
      dropOpened: !this.state.dropOpened,
    })
  }

  /**
   * Updated the user status and refresh it on the page
   * @param status New status
   */
  private async setStatus(status: string): Promise<void> {
    try {
      const response = await api.put<ApiStatusResponse>('/seller/status', {
        status,
      })

      this.setState({
        status: response.data.status,
      })

      this.toggleStatusButton()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Seller status menu list
   */
  private showStatusMenu(): JSX.Element | undefined {
    if (this.state.dropOpened) {
      return (
        <ul className="status-list">
          <li>
            <button onClick={() => void this.setStatus('available')}>
              <span className="status-indicator status-available"></span>
              <p>Disponible</p>
            </button>
          </li>
          <li>
            <button onClick={() => void this.setStatus('unavailable')}>
              <span className="status-indicator status-unavailable"></span>
              <p>Indisponible</p>
            </button>
          </li>
          <li>
            <button onClick={() => void this.setStatus('vacation')}>
              <span className="status-indicator status-vacation"></span>
              <p>En vacances</p>
            </button>
          </li>
        </ul>
      )
    }
  }

  private get status(): string {
    switch (this.state.status) {
      case 'available':
        return 'status-available'
      case 'unavailable':
        return 'status-unavailable'
      case 'vacation':
        return 'status-vacation'
      default:
        return ''
    }
  }

  public render(): JSX.Element {
    const { path, url } = this.props.match

    return (
      <main id="seller">
        <aside className="side-menu">
          <div className={`status-container ${this.state.dropOpened ? 'active' : ''}`}>
            <button onClick={this.toggleStatusButton.bind(this)}>
              <p>Status:</p>
              <span className={`status-indicator ${this.status}`}></span>
            </button>
            {this.showStatusMenu()}
          </div>
          <h1 className="title">Mes services</h1>
          <ul>
            <li>
              <NavLink activeClassName="active" exact to={url}>
                <i className="fas fa-home"></i>
                Général
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${url}/services`}>
                <i className="fas fa-store-alt"></i>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${url}/commandes`}>
                <i className="fas fa-shopping-cart"></i>
                Commandes
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${url}/contacts`}>
                <i className="fas fa-address-book"></i>
                Contacts
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className="content">
          <Switch>
            <Route exact path={path} component={SellerHome} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    )
  }
}

export default Seller
