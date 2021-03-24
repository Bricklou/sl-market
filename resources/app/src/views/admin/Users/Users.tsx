import { Component } from 'react'
import Button from '../../../components/base/Button/Button'
import Input from '../../../components/form/Input/Input'
import api from '../../../utils/api'
import { ApiPagination, ApiPaginationMeta } from '../../../types'
import './users.scss'
import UserItem from './components/UserItem/UserItem'
import { UserInfo } from '../../../store/modules/user'
import Paginator from '../../../components/base/Paginator/Paginator'
import { connect } from 'react-redux'
import { RootState } from '../../../store'
import Loading from '../../../components/base/Loading/Loading'
import DeleteModal, { ModalResponses } from './components/DeleteModal/DeleteModal'

type ApiUserResponse = ApiPagination<UserInfo>

interface UsersState {
  users: UserInfo[]
  meta?: ApiPaginationMeta
  search: string
  page: number
  selectedUser?: UserInfo
  deleteLoading: boolean
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
})

type UserProps = ReturnType<typeof mapStateToProps>

class Users extends Component<UserProps, UsersState> {
  state: UsersState = {
    users: [],
    meta: undefined,
    search: '',
    page: 1,
    selectedUser: undefined,
    deleteLoading: false,
  }
  async componentDidMount() {
    try {
      await this.fetchUserList()
    } catch (error) {
      console.error(error)
    }
  }

  private async fetchUserList() {
    const result = await api.get<ApiUserResponse>('/admin/users', {
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

  private showUserList() {
    if (this.state.users && this.props.user) {
      return this.state.users.map((user, index) => {
        return (
          <UserItem
            user={user}
            key={index}
            canDelete={this.props.user && user.id !== this.props.user.id}
            onDelete={() => {
              this.setState({
                selectedUser: user,
              })
            }}
          ></UserItem>
        )
      })
    }
  }

  private async deleteUser(user: UserInfo) {
    try {
      await api.delete('/admin/user', {
        params: {
          id: user.id,
        },
      })
    } catch (error) {}
  }

  private showDeleteModal() {
    if (this.state.selectedUser) {
      const u = this.state.selectedUser
      return (
        <DeleteModal
          isOpen={true}
          user={u}
          loading={this.state.deleteLoading}
          onClose={async (result) => {
            if (result === ModalResponses.DELETE) {
              this.setState({ deleteLoading: true })

              await this.deleteUser(u)

              await this.fetchUserList()
            }
            this.setState({
              selectedUser: undefined,
              deleteLoading: false,
            })
          }}
        />
      )
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
                <th>Rôle(s)</th>
                <th>Créé le</th>
                <th>Dernière connexion</th>
                <th className="right">Actions</th>
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
      <div id="admin-user">
        <header>
          <h2 className="title">Utilisateurs</h2>
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
        {this.showDeleteModal()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Users)
