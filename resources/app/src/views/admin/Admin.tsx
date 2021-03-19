import { Component } from 'react'
import { NavLink, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import AdminHome from './Home/Home'

import './admin.scss'
import NotFound from '../base/not_found/NotFound'

class Admin extends Component<RouteComponentProps> {
  render() {
    const { path, url } = this.props.match
    return (
      <main id="admin">
        <aside className="side-menu">
          <ul>
            <li>
              <NavLink activeClassName="active" to={url}>
                <i className="fas fa-home"></i>
                Général
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${url}/utilisateurs`}>
                <i className="fas fa-users"></i>
                Utilisateurs
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className="content">
          <Switch>
            <Route exact path={path} component={AdminHome} />
            <Route path={`${path}/*`} component={NotFound} />
          </Switch>
        </div>
      </main>
    )
  }
}

export default withRouter(Admin)
