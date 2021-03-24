import { Component } from 'react'
import { NavLink, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import './admin.scss'

import AdminHome from './Home/Home'
import Users from './Users/Users'
import Roles from './Roles/Roles'
import NotFound from '../base/not_found/NotFound'

class Admin extends Component<RouteComponentProps> {
  render() {
    const { path, url } = this.props.match
    return (
      <main id="admin">
        <aside className="side-menu">
          <h1 className="title">Administration</h1>
          <ul>
            <li>
              <NavLink activeClassName="active" exact to={url}>
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
            <li>
              <NavLink activeClassName="active" exact to={`${url}/roles`}>
                <i className="fas fa-user-tag"></i>
                Rôles
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className="content">
          <Switch>
            <Route exact path={path} component={AdminHome} />
            <Route exact path={`${path}/utilisateurs`} component={Users} />
            <Route exact path={`${path}/roles`} component={Roles} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    )
  }
}

export default withRouter(Admin)
