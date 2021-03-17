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

          {/* Auth routes */}
          <GuardProvider guards={[this.requireGuest]} loading={LoadingView}>
            <Switch>
              <GuardedRoute exact path="/authentication" component={Authentication} />
            </Switch>
          </GuardProvider>
          {/* Page not found */}
          <Route component={NotFound} />
        </Switch>
      </GuardProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
