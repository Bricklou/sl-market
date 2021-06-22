import { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Loading from '../../../components/base/Loading/Loading'
import { RootState } from '../../../store'
import auth from '../../../utils/auth'
import './authentication.scss'
import { login, logout, UserInfo } from '../../../store/modules/user'
import { CombinedState } from 'redux'

const mapStateToProps = (state: RootState): CombinedState<{ user?: UserInfo }> => ({
  user: state.user.user,
})

const mapDispatchToProps = { login, logout }

type AuthenticationProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

interface AuthenticationState {
  loading: boolean
  btnDisabled: boolean
  errors: string[]
}

/**
 * Authentication page is there as fallback for Discord OAuth2
 */
class Authentication extends Component<
  AuthenticationProps & RouteComponentProps,
  AuthenticationState
> {
  public readonly state: AuthenticationState = {
    loading: true,
    btnDisabled: true,
    errors: [],
  }

  /**
   * Try to auth the user with the `code` query params when the page is loaded.
   */
  public async componentDidMount(): Promise<void> {
    const queries = new URLSearchParams(this.props.location.search)
    const code = queries.get('code')
    const state = queries.get('state')
    if (code && state) {
      try {
        const response = await auth.loginWithToken(code, state)
        this.props.login(response.data)
        this.props.history.push(queries.get('to') || '/')
      } catch (error) {
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              this.props.history.push('/')
              break
            default:
              this.setState({
                errors: [
                  "Une erreur serveur est survenue. Si l'erreur persiste, merci de contacter l'administrateur.",
                ],
              })
              console.error(error)
          }
        }
      }
    } else {
      this.props.history.push('/')
    }
  }

  private showError(): JSX.Element | undefined {
    if (this.state.errors) {
      return (
        <div className="errors">
          <h2 className="error-title">Erreur</h2>
          {this.state.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )
    }
  }

  private showLoading(): JSX.Element | undefined {
    return <Loading className="mx-auto" />
  }

  public render(): JSX.Element {
    return (
      <main id="authentication">
        <div className="box">
          {this.state.errors.length > 0 ? this.showError() : this.showLoading()}
        </div>
      </main>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication))
