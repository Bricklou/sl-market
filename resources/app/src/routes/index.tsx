import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute, GuardFunction } from 'react-router-guards'
import Authentication from '../views/auth/Authentication/Authentication'
import Home from '../views/home/Home'
import NotFound from '../views/base/not_found/NotFound'
import auth from '../utils/auth'
import { RootState } from '../store'
import { login, logout } from '../store/modules/user'

import LoadingView from '../views/base/loading_view/LoadingView'
import { Component } from 'react'
import { connect } from 'react-redux'
import Acl from '../utils/Acl'
import Admin from '../views/admin/Admin'
import Seller from '../views/seller/Seller'

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = { login, logout }

type AppRouterProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class AppRouter extends Component<AppRouterProps & RouteComponentProps> {
  private silentAuth: GuardFunction = async (to, from, next) => {
    try {
      const response = await auth.refresh()
      this.props.login(response.data)
    } catch (error) {
      this.props.logout()
    }
    next()
  }

  private requireGuest: GuardFunction = async (to, from, next) => {
    if (!this.props.isAuthenticated) {
      next()
    } else {
      next.redirect('/')
    }
  }

  private requireAdmin: GuardFunction = (to, from, next) => {
    if (this.props.user && Acl.can(this.props.user, ['access:adminPanel'])) {
      next()
    } else {
      next.redirect('/')
    }
  }

  private requireSeller: GuardFunction = (to, from, next) => {
    if (this.props.user && Acl.can(this.props.user, ['access:sellerPanel'])) {
      next()
    } else {
      next.redirect('/')
    }
  }

  async componentDidMount() {
    try {
      const response = await auth.refresh()
      this.props.login(response.data)
    } catch (_) {
      this.props.logout()
    }
  }
  render() {
    return (
      <GuardProvider guards={[this.silentAuth]} loading={LoadingView}>
        <Switch>
          {/* Base routes */}
          <Route exact path="/" component={Home} />

          {/* Admin routes */}
          <GuardedRoute path="/administration" component={Admin} guards={[this.requireAdmin]} />

          {/* Seller routes */}
          <GuardedRoute path="/mes-services" component={Seller} guards={[this.requireSeller]} />

          {/* Auth routes */}

          <GuardedRoute
            exact
            path="/authentication"
            component={Authentication}
            guards={[this.requireGuest]}
          />

          {/* Page not found */}
          <Route path="*" component={NotFound} />
        </Switch>
      </GuardProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
