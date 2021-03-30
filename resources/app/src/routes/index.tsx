import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute, GuardFunction } from 'react-router-guards'
import Authentication from '../views/auth/Authentication/Authentication'
import Home from '../views/home/Home'
import NotFound from '../views/base/not_found/NotFound'
import auth from '../utils/auth'
import { RootState } from '../store'
import { login, logout, UserInfo } from '../store/modules/user'

import LoadingView from '../views/base/loading_view/LoadingView'
import { Component } from 'react'
import { connect } from 'react-redux'
import Acl from '../utils/Acl'
import Admin from '../views/admin/Admin'
import Seller from '../views/seller/Seller'
import { CombinedState } from 'redux'

/**
 * fetch current user from store
 */
const mapStateToProps = (
  state: RootState
): CombinedState<{ user?: UserInfo; isAuthenticated: boolean | null }> => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = { login, logout }

type AppRouterProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

/**
 * Application router
 */
class AppRouter extends Component<AppRouterProps & RouteComponentProps> {
  /**
   * Silent auth guard will refresh the user every time the methods is called.
   */
  private silentAuth: GuardFunction = async (to, from, next) => {
    try {
      const response = await auth.refresh()
      this.props.login(response.data)
    } catch (error) {
      this.props.logout()
    }
    next()
  }

  /**
   * Guest guard will prevent authenticated user to access the route
   */
  private requireGuest: GuardFunction = async (to, from, next) => {
    if (!this.props.isAuthenticated) {
      next()
    } else {
      next.redirect('/')
    }
  }

  /**
   * Admin guard will prevent non-administrator to access the route
   */
  private requireAdmin: GuardFunction = (to, from, next) => {
    if (this.props.user && Acl.can(this.props.user, ['access:adminPanel'])) {
      next()
    } else {
      next.redirect('/')
    }
  }

  /**
   * Seller guard will prevent all non-seller users
   */
  private requireSeller: GuardFunction = (to, from, next) => {
    if (this.props.user && Acl.can(this.props.user, ['access:sellerPanel'])) {
      next()
    } else {
      next.redirect('/')
    }
  }

  /**
   * When the router start, try to resfresh the user.
   * If auth informations are invalid, log him out.
   */
  public async componentDidMount(): Promise<void> {
    try {
      const response = await auth.refresh()
      this.props.login(response.data)
    } catch (_) {
      this.props.logout()
    }
  }

  public render(): JSX.Element {
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
