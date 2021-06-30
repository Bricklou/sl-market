import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserInfo } from '@/store/modules/user'
import DeleteModal from './DeleteModal'

describe('Delete Modal component', () => {
  const user: UserInfo = {
    avatar: '',
    email: 'some.random@email.test',
    id: 'randomID',
    username: 'random user',
    last_login: new Date().toUTCString(),
    created_at: new Date().toUTCString(),
    permissions: ['some:permission', 'other:permission'],
    roles: [
      {
        id: 1,
        name: 'Role 1',
        slug: 'role1',
      },
      {
        id: 2,
        name: 'Role 2',
        slug: 'role2',
      },
    ],
  }

  it('Should be closed', () => {
    render(<DeleteModal onClose={() => {}} isOpen={false} user={user} loading={false} />)

    const modal = screen.queryByRole('dialog')
    expect(modal).not.toBeInTheDocument()
  })

  it('Should close when click on overlay', () => {
    const onClose = jest.fn()
    render(<DeleteModal onClose={onClose} isOpen={true} user={user} loading={false} />)

    const overlay = screen.getByTestId('modal-overlay')
    userEvent.click(overlay)
    expect(onClose).toBeCalled()
  })

  it('Should close when click on close button', () => {
    const onClose = jest.fn()
    render(<DeleteModal onClose={onClose} isOpen={true} user={user} loading={false} />)

    const cancelButton = screen.getAllByRole('button')[1]
    userEvent.click(cancelButton)
    expect(onClose).toBeCalled()
  })

  it('Should close when click on delete button', () => {
    const onClose = jest.fn()
    render(<DeleteModal onClose={onClose} isOpen={true} user={user} loading={false} />)

    const deleteButton = screen.getAllByRole('button')[1]
    userEvent.click(deleteButton)
    expect(onClose).toBeCalled()
  })

  it('Should close when click on cancel button', () => {
    const onClose = jest.fn()
    render(<DeleteModal onClose={onClose} isOpen={true} user={user} loading={false} />)

    const cancelButton = screen.getAllByRole('button')[2]
    userEvent.click(cancelButton)
    expect(onClose).toBeCalled()
  })
})
