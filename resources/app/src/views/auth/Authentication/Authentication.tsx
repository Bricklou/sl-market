import { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Loading from '../../../components/Loading/Loading'
import { RootState } from '../../../store'
import auth from '../../../utils/auth'
import './authentication.scss'
import { login, logout } from '../../../store/modules/user'

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
})

const mapDispatchToProps = { login, logout }

type AuthenticationProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

interface AuthenticationState {
  loading: boolean
  btnDisabled: boolean
  errors: string[]
}

class Authentication extends Component<
  AuthenticationProps & RouteComponentProps,
  AuthenticationState
> {
  readonly state: AuthenticationState = {
    loading: true,
    btnDisabled: true,
    errors: [],
  }

  async componentDidMount() {
    const queries = new URLSearchParams(this.props.location.search)
    const code = queries.get('code')
    if (code) {
      try {
        const response = await auth.loginWithToken(code)
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

  private showError() {
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

  private showLoading() {
    return <Loading className="mx-auto" />
  }

  render() {
    return (
      <main id="authentication">
        <div className="box">
          {console.log(this.state.errors)}
          {this.state.errors.length > 0 ? this.showError() : this.showLoading()}
        </div>
      </main>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication))
