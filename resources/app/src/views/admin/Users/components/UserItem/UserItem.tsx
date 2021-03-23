import { Component } from 'react'
import { UserInfo } from '../../../../../store/modules/user'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import './user-item.scss'

interface UserItemProps {
  user: UserInfo
  canDelete?: boolean
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

  render() {
    return (
      <tr className="user-item">
        <td className="user-profile">
          <div className="avatar-container">
            <img alt="profil" src={this.userAvatar} />
          </div>
          <p className="username">{this.props.user.username}</p>
        </td>
        <td className="roles">
          <ul>
            {this.props.user.roles.map((role, index) => (
              <li key={index}>{role.name}</li>
            ))}
          </ul>
        </td>
        <td>
          <p className="text-gray-900 whitespace-no-wrap">
            {this.formatDate(this.props.user.created_at)}
          </p>
        </td>
        <td>
          <p className="text-gray-900 whitespace-no-wrap">
            {this.formatDate(this.props.user.last_login)}
          </p>
        </td>
        <td>
          <div className="actions">{this.showDeleteBtn()}</div>
        </td>
      </tr>
    )
  }
  showDeleteBtn() {
    if (this.props.canDelete) {
      return (
        <button className="delete" onClick={(e) => this.props.onDelete(e)}>
          <i className="fas fa-trash"></i>
        </button>
      )
    }
  }
}
