import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

describe('Checkbox component', () => {
  it('Should render the checkbox', () => {
    render(<Checkbox id="test-checkbox" label="test" onChange={() => {}} />)

    const checkbox = screen.queryByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('Should be checked', () => {
    render(<Checkbox id="test-checkbox" label="test" checked onChange={() => {}} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('Should be disabled', () => {
    render(<Checkbox id="test-checkbox" label="test" disabled onChange={() => {}} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('Should emit callback when changed', () => {
    const onChange = jest.fn()
    render(<Checkbox id="test-checkbox" label="test" onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    userEvent.click(checkbox)
    expect(onChange).toBeCalled()
  })
})
