import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import api from '../../utils/api'

jest.mock('../../utils/api.ts')
const mockedApi = api as jest.Mocked<typeof api>

describe('Navbar component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch({
      type: 'user/LOGOUT',
    })
  })

  it('Should render a Navbar', () => {
    const navTitle = screen.queryByText(/sl-market/i)
    expect(navTitle).toBeInTheDocument()
  })

  it('Should show user buttons when authenticated', async () => {
    store.dispatch({
      type: 'user/LOGIN',
      payload: {
        id: 'randomID',
        username: 'random username',
        email: 'some.random@email.test',
        avatar: '',
        created_at: new Date().toUTCString(),
        last_login: new Date().toUTCString(),
        permissions: [],
        roles: [],
      },
    })

    const userAvatar = screen.queryByTestId('user-avatar')
    expect(userAvatar).toBeInTheDocument()
  })

  it('Should show admin button when user has permission', () => {
    store.dispatch({
      type: 'user/LOGIN',
      payload: {
        id: 'randomID',
        username: 'random username',
        email: 'some.random@email.test',
        avatar: '',
        created_at: new Date().toUTCString(),
        last_login: new Date().toUTCString(),
        permissions: ['access:adminPanel'],
        roles: [
          {
            id: 0,
            name: 'Administrateur',
            slug: 'admin',
          },
        ],
      },
    })

    const adminLink = screen.queryByText(/Administration/i)
    expect(adminLink).toBeInTheDocument()
  })

  it('Should show seller links when user has permission', () => {
    store.dispatch({
      type: 'user/LOGIN',
      payload: {
        id: 'randomID',
        username: 'random username',
        email: 'some.random@email.test',
        avatar: '',
        created_at: new Date().toUTCString(),
        last_login: new Date().toUTCString(),
        permissions: ['access:sellerPanel'],
        roles: [
          {
            id: 0,
            name: 'Vendeur',
            slug: 'seller',
          },
        ],
      },
    })

    const adminLink = screen.queryByText(/Mes services/i)
    expect(adminLink).toBeInTheDocument()
  })

  it('Should logout the user', async () => {
    mockedApi.delete.mockImplementationOnce(async () => await Promise.resolve({}))

    store.dispatch({
      type: 'user/LOGIN',
      payload: {
        id: 'randomID',
        username: 'random username',
        email: 'some.random@email.test',
        avatar: '',
        created_at: new Date().toUTCString(),
        last_login: new Date().toUTCString(),
        permissions: ['access:sellerPanel'],
        roles: [
          {
            id: 0,
            name: 'Vendeur',
            slug: 'seller',
          },
        ],
      },
    })

    const logoutBtn = screen.getByTestId('logout-btn')
    fireEvent.click(logoutBtn)

    await waitFor(() => {
      const authLink = screen.queryByText(/Authentification/i)
      expect(authLink).toBeInTheDocument()
    })
  })
})
