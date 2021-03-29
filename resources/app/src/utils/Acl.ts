import { every, some } from 'lodash'
import { UserInfo } from '../store/modules/user'

/**
 * Acl will help to manage user permissions.
 */
export default class Acl {
  /**
   * Check if an user has a specific permission
   *
   * @param {UserInfo} user The user
   * @param {string[]} permission Wanted permissions
   * @returns {boolean} If `true` the user has the permission.
   */
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
