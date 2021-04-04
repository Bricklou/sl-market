import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal component', () => {
  const title = 'super title'
  const content = {
    main: <h1>content</h1>,
    footer: (
      <div>
        <p>footer</p>
      </div>
    ),
  }

  it('Should be closed', () => {
    render(
      <Modal onClose={() => {}} title={title} isOpen={false}>
        {content}
      </Modal>
    )

    const modal = screen.queryByRole('dialog')
    expect(modal).not.toBeInTheDocument()
  })

  it('Should have an icon', () => {
    render(
      <Modal onClose={() => {}} title={title} isOpen={true} icon="fas fa-user">
        {content}
      </Modal>
    )

    const icon = screen.queryByTestId('modal-icon')
    expect(icon).toBeInTheDocument()
  })

  it('Should have a close button', () => {
    render(
      <Modal onClose={() => {}} title={title} isOpen={true} closeBtn={true}>
        {content}
      </Modal>
    )

    const closeBtn = screen.queryByTestId('close-button')
    expect(closeBtn).toBeInTheDocument()
  })

  it('Should close when click on close button', () => {
    const onClose = jest.fn()
    render(
      <Modal onClose={onClose} title={title} isOpen={true} closeBtn={true}>
        {content}
      </Modal>
    )

    const closeBtn = screen.getByTestId('close-button')
    userEvent.click(closeBtn)
    expect(onClose).toBeCalled()
  })

  it('Should close when click on overlay', () => {
    const onClose = jest.fn()
    render(
      <Modal onClose={onClose} title={title} isOpen={true} closeBtn={true}>
        {content}
      </Modal>
    )

    const overlay = screen.getByTestId('modal-overlay')
    userEvent.click(overlay)
    expect(onClose).toBeCalled()
  })

  it("Shouldn't close when click on modal", () => {
    const onClose = jest.fn()
    render(
      <Modal onClose={onClose} title={title} isOpen={true} closeBtn={true}>
        {content}
      </Modal>
    )

    const overlay = screen.getByRole('dialog')
    userEvent.click(overlay)
    expect(onClose).not.toBeCalled()
  })
})
