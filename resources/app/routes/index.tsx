import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute, GuardFunction } from 'react-router-guards'
import Authentication from '@v/auth/Authentication/Authentication'
import Home from '@v/home/Home'
import NotFound from '@v/base/not_found/NotFound'
import auth from '@/utils/auth'
import { RootState } from '@/store'
import { login, logout, UserInfo } from '@/store/modules/user'

import LoadingView from '@v/base/loading_view/LoadingView'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Acl from '@/utils/Acl'
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
   * Auth guard will prevent guest user to access the route
   */
  private requireAuth: GuardFunction = async (to, from, next) => {
    const response = await auth.refresh()
    this.props.login(response.data)
    if (this.props.isAuthenticated) {
      next()
    } else {
      next.redirect('/')
    }
  }

  /**
   * Admin guard will prevent non-administrator to access the route
   */
  private requireAdmin: GuardFunction = async (to, from, next) => {
    const response = await auth.refresh()
    this.props.login(response.data)
    if (this.props.user && Acl.can(this.props.user, ['access:adminPanel'])) {
      next()
    } else {
      next.redirect('/')
    }
  }

  /**
   * Seller guard will prevent all non-seller users
   */
  private requireSeller: GuardFunction = async (to, from, next) => {
    const response = await auth.refresh()
    this.props.login(response.data)
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
      <GuardProvider loading={LoadingView}>
        <Switch>
          {/* Base routes */}
          <Route exact path="/" component={Home} />

          {/* Admin routes */}
          <GuardedRoute
            path="/administration"
            component={React.lazy(
              async () => await import(/* webpackChunkName: "admin" */ '../views/admin/Admin')
            )}
            guards={[this.requireAdmin]}
          />

          {/* Seller routes */}
          <GuardedRoute
            path="/mes-services"
            component={React.lazy(
              async () =>
                await import(/* webpackChunkName: "my-services" */ '../views/seller/Seller')
            )}
            guards={[this.requireSeller]}
          />

          {/* Profile route */}
          <GuardedRoute
            path="/profil"
            component={React.lazy(
              async () =>
                await import(/* webpackChunkName: "profil" */ '../views/auth/Profile/Profile')
            )}
            guards={[this.requireAuth]}
          />

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
