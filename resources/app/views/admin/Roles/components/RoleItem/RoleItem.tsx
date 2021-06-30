import { Component } from 'react'
import format from 'date-fns/format'
import fr from 'date-fns/locale/fr'
import { UserInfo } from '@/store/modules/user'
import Checkbox from '@c/form/Checkbox/Checkbox'
import './role-item.scss'

export interface RoleItemProps {
  user: UserInfo
  canChange?: boolean
  onChange: (key: 'admin' | 'seller', value: boolean) => void
}

export default class UserItem extends Component<RoleItemProps> {
  private formatDate(date: string): string {
    return format(new Date(date), 'P', {
      locale: fr,
    })
  }

  private get hasAdminRole(): boolean {
    return this.props.user.roles.some((r) => r.slug === 'admin')
  }

  private get hasSellerRole(): boolean {
    return this.props.user.roles.some((r) => r.slug === 'seller')
  }

  public render(): JSX.Element {
    return (
      <tr className="user-item">
        <td className="user-profile">
          <div className="avatar-container">
            <img alt="profil" src={this.props.user.avatar} />
          </div>
          <p className="username">{this.props.user.username}</p>
        </td>
        <td>
          <p className="text-gray-900 whitespace-no-wrap">
            {/* Render an human readable date */}
            {this.formatDate(this.props.user.last_login)}
          </p>
        </td>
        <td>
          {/* If the user is not allowed to updated the role, then the checkbox will be disabled  */}
          <Checkbox
            id={`admin-${this.props.user.id}`}
            checked={this.hasAdminRole}
            disabled={!this.props.canChange}
            label="Administateur"
            onChange={(event) => {
              this.props.onChange('admin', event.target.checked)
            }}
          />
        </td>
        <td>
          <Checkbox
            id={`admin-${this.props.user.id}`}
            checked={this.hasSellerRole}
            label="Vendeur"
            onChange={(event) => {
              this.props.onChange('seller', event.target.checked)
            }}
          />
        </td>
      </tr>
    )
  }
}
