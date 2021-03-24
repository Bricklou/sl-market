import { Component } from 'react'
import CountUp from 'react-countup'
import api from '../../../utils/api'
import './home.scss'

interface AdminHomeState {
  usersCount: number
  sellersCount: number
  commandsCount: number
}

interface ApiCountResponse {
  counts: {
    users: number
    sellers: number
    commands: number
  }
}

export default class AdminHome extends Component<{}, AdminHomeState> {
  public state: AdminHomeState = {
    usersCount: 0,
    sellersCount: 0,
    commandsCount: 0,
  }

  async componentDidMount() {
    try {
      const result = await api.get<ApiCountResponse>('/admin/stats')

      if (result.data) {
        this.setState({
          usersCount: result.data.counts.users,
          sellersCount: result.data.counts.sellers,
          commandsCount: result.data.counts.commands,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const countDuration = 2
    return (
      <div id="admin-home">
        <header>
          <h2 className="title">Général</h2>
        </header>
        <section className="card-grid">
          <article className="card card-orange">
            <div className="icon">
              <i className="fas fa-users"></i>
              <p className="number">
                <CountUp end={this.state.usersCount} duration={countDuration} />
              </p>
            </div>
            <h1 className="card-title">Nombre d'utilisateurs</h1>
          </article>

          <article className="card card-purple">
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
            <p className="number">
              <CountUp end={this.state.sellersCount} duration={countDuration} />
            </p>
            <h1 className="card-title">Nombre de vendeurs</h1>
          </article>

          <article className="card card-red">
            <div className="icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <p className="number">
              <CountUp end={this.state.commandsCount} duration={countDuration} />
            </p>
            <h1 className="card-title">Nombre de commandes en cours</h1>
          </article>
        </section>
      </div>
    )
  }
}
