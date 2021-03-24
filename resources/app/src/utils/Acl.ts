import { every, some } from 'lodash'
import { UserInfo } from '../store/modules/user'

export default class Acl {
  public static can(user: UserInfo | undefined, permission: string[]): boolean {
    if (user === undefined) {
      return false
    }
    return every(permission, (scope) =>
      some(
        user.permissions,
        (permission) => new RegExp('^' + scope.replace('*', '.*') + '$').exec(permission) !== null
      )
    )
  }
}
