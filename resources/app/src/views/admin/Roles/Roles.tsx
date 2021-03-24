import { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/base/Button/Button'
import Loading from '../../../components/base/Loading/Loading'
import Paginator from '../../../components/base/Paginator/Paginator'
import Input from '../../../components/form/Input/Input'
import { RootState } from '../../../store'
import { UserInfo } from '../../../store/modules/user'
import { ApiPagination, ApiPaginationMeta } from '../../../types'
import api from '../../../utils/api'
import RoleItem from './components/RoleItem/RoleItem'
import './roles.scss'

type ApiRoleResponse = ApiPagination<UserInfo>

interface RolesState {
  users: UserInfo[]
  meta?: ApiPaginationMeta
  search: string
  page: number
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
})
type RolesProps = ReturnType<typeof mapStateToProps>

class Roles extends Component<RolesProps, RolesState> {
  state: RolesState = {
    users: [],
    meta: undefined,
    search: '',
    page: 1,
  }

  async componentDidMount() {
    try {
      await this.fetchUserList()
    } catch (error) {
      console.error(error)
    }
  }

  private async fetchUserList() {
    const result = await api.get<ApiRoleResponse>('/admin/users', {
      params: {
        page: this.state.page,
        search: this.state.search,
      },
    })
    this.setState({
      users: result.data.data,
      meta: result.data.meta,
    })
  }

  private async updateUserRole(userId: string, roleName: string, state: boolean) {
    try {
      await api.put('/admin/user/role', {
        userId,
        role: roleName,
        state,
      })
      await this.fetchUserList()
    } catch (error) {
      console.error(error)
    }
  }

  private showUserList() {
    if (this.state.users && this.props.user) {
      const u = this.props.user
      return this.state.users.map((user, index) => {
        return (
          <RoleItem
            user={user}
            key={index}
            canChange={user.id !== u.id}
            onChange={async (key, value) => {
              await this.updateUserRole(user.id, key, value)
            }}
          />
        )
      })
    }
  }

  private showTable() {
    if (this.state.meta) {
      return (
        <div className="table">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Dernière connexion</th>
                <th>Administrateur</th>
                <th>Vendeur</th>
              </tr>
            </thead>
            <tbody>{this.showUserList()}</tbody>
          </table>
          <Paginator
            pageChange={(page) => {
              this.setState({
                page,
              })
              this.fetchUserList()
            }}
            currentPage={this.state.meta.current_page}
            totalRecords={this.state.meta.total}
            pageLimit={this.state.meta.per_page}
            maxNeighbours={2}
          />
        </div>
      )
    } else {
      return <Loading />
    }
  }

  render() {
    return (
      <div id="admin-roles">
        <header>
          <h2 className="title">Rôles</h2>

          <div className="form-container">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                this.fetchUserList()
              }}
            >
              <div className="relative">
                <Input
                  id="user-search"
                  placeholder="Rechercher"
                  icon="fas fa-search"
                  type="search"
                  name="user-search"
                  onChange={(event) => {
                    this.setState({ search: event.target.value })
                  }}
                />
              </div>
              <Button icon="fas fa-search" className="search-button" type="submit">
                Chercher
              </Button>
            </form>
          </div>
        </header>
        <div className="table-container">{this.showTable()}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Roles)
