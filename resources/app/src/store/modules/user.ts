export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P }
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar: string
  created_at: string
  last_login: string
  permissions: string[]
  roles: {
    id: number
    name: string
    slug: number
  }[]
}

interface UserState {
  user?: UserInfo
  isAuthenticated: boolean | null
}

const initialState: UserState = {
  user: undefined,
  isAuthenticated: null,
}

export const login = (u: UserInfo) => typedAction('user/LOGIN', u)

export const logout = () => typedAction('user/LOGOUT')

type UserAction = ReturnType<typeof login | typeof logout>

export function userReducer(state = initialState, actions: UserAction): UserState {
  switch (actions.type) {
    case 'user/LOGIN':
      return {
        user: {
          id: actions.payload.id,
          username: actions.payload.username,
          email: actions.payload.email,
          avatar: actions.payload.avatar,
          last_login: actions.payload.last_login,
          permissions: actions.payload.permissions,
          created_at: actions.payload.created_at,
          roles: actions.payload.roles,
        },
        isAuthenticated: true,
      }
    case 'user/LOGOUT':
      return {
        user: undefined,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
