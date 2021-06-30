import { Component } from 'react'
import { connect } from 'react-redux'
import { CombinedState } from 'redux'
import Button from '@c/base/Button/Button'
import Loading from '@c/base/Loading/Loading'
import Paginator from '@c/base/Paginator/Paginator'
import Input from '@c/form/Input/Input'
import { RootState } from '@/store'
import { UserInfo } from '@/store/modules/user'
import api from '@/utils/api'
import RoleItem from './components/RoleItem/RoleItem'
import './roles.scss'
import { ApiPagination, ApiPaginationMeta } from '@/typings/types'

type ApiRoleResponse = ApiPagination<UserInfo>

interface RolesState {
  users: UserInfo[]
  meta?: ApiPaginationMeta
  search: string
  page: number
}

const mapStateToProps = (state: RootState): CombinedState<{ user?: UserInfo }> => ({
  user: state.user.user,
})
type RolesProps = ReturnType<typeof mapStateToProps>

/**
 * Role page allow admins to manage user roles.
 */
class Roles extends Component<RolesProps, RolesState> {
  public readonly state: RolesState = {
    users: [],
    meta: undefined,
    search: '',
    page: 1,
  }

  // Fetch the user list when the page is rendered.
  public async componentDidMount(): Promise<void> {
    try {
      await this.fetchUserList()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetch user list.
   * Store users list and pagination metadata to the state
   */
  private async fetchUserList(): Promise<void> {
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

  /**
   * Update the role of a provided user.
   *
   * @param userId User ID of the user you want to update
   * @param roleName Role slug you want to update
   * @param state If `true`, the role will be added, otherwise it will be removed
   */
  private async updateUserRole(userId: string, roleName: string, state: boolean): Promise<void> {
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

  private showUserList(): JSX.Element[] | undefined {
    if (this.state.users && this.props.user) {
      const u = this.props.user
      return this.state.users.map((user, index) => {
        return (
          <RoleItem
            user={user}
            key={index}
            /* Prevent user to self update some roles */
            canChange={user.id !== u.id}
            onChange={async (key, value) => {
              await this.updateUserRole(user.id, key, value)
            }}
          />
        )
      })
    }
  }

  private showTable(): JSX.Element | undefined {
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
            onPageChange={(page) => {
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

  public render(): JSX.Element {
    return (
      <div id="admin-roles">
        <header>
          <h2 className="title">Rôles</h2>

          {/* Header form to search user in the whole list */}
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
        {/* The paginated users list */}
        <div className="table-container">{this.showTable()}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Roles)
