import { every, some } from 'lodash'
import { UserInfo } from './auth'

export default class Acl {
  public static can(user: UserInfo, permission: string[]): boolean {
    return every(permission, (scope) =>
      some(
        user.permissions,
        (permission) => new RegExp('^' + scope.replace('*', '.*') + '$').exec(permission) !== null
      )
    )
  }
}
