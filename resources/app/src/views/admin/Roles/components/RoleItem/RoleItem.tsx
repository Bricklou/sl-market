import { Component } from 'react'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { UserInfo } from '../../../../../store/modules/user'
import Checkbox from '../../../../../components/form/Checkbox/Checkbox'

interface UserItemProps {
  user: UserInfo
  canChange?: boolean
  onChange: (key: 'admin' | 'seller', value: boolean) => void
}

export default class UserItem extends Component<UserItemProps> {
  get userAvatar() {
    if (this.props.user) {
      return `https://cdn.discordapp.com/avatars/${this.props.user.id}/${this.props.user.avatar}.png`
    }
    return ''
  }

  private formatDate(date: string) {
    return format(new Date(date), 'P', {
      locale: fr,
    })
  }

  get hasAdminRole() {
    return this.props.user.roles.some((r) => r.slug === 'admin')
  }

  get hasSellerRole() {
    return this.props.user.roles.some((r) => r.slug === 'seller')
  }

  render() {
    return (
      <tr className="user-item">
        <td className="user-profile">
          <div className="avatar-container">
            <img alt="profil" src={this.userAvatar} />
          </div>
          <p className="username">{this.props.user.username}</p>
        </td>
        <td>
          <p className="text-gray-900 whitespace-no-wrap">
            {this.formatDate(this.props.user.last_login)}
          </p>
        </td>
        <td>
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
