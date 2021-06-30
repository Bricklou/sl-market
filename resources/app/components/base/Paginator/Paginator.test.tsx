import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Paginator from './Paginator'

describe('Paginator component', () => {
  it('Should not render the paginator', () => {
    render(<Paginator currentPage={1} totalRecords={5} pageLimit={20} onPageChange={() => {}} />)

    const paginator = screen.queryByRole('paginator')
    expect(paginator).not.toBeInTheDocument()
  })

  it('Should render the next button', () => {
    render(<Paginator currentPage={1} totalRecords={100} pageLimit={20} onPageChange={() => {}} />)

    const paginator = screen.queryByTestId('next-button')
    expect(paginator).toBeInTheDocument()
  })

  it('Should hide next button on last page', () => {
    render(<Paginator currentPage={3} totalRecords={60} pageLimit={20} onPageChange={() => {}} />)

    const paginator = screen.queryByTestId('next-button')
    expect(paginator).not.toBeInTheDocument()
  })

  it('Should render the previous button', () => {
    render(<Paginator currentPage={2} totalRecords={100} pageLimit={20} onPageChange={() => {}} />)

    const paginator = screen.queryByTestId('previous-button')
    expect(paginator).toBeInTheDocument()
  })

  it('Should change page when clicking a link', () => {
    const onChange = jest.fn()
    render(<Paginator currentPage={2} totalRecords={100} pageLimit={20} onPageChange={onChange} />)

    const button = screen.getAllByTestId('page-button')[0]
    userEvent.click(button)
    expect(onChange).toBeCalled()
  })
})
