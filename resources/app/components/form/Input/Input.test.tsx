import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input component', () => {
  it('Should render an input', () => {
    render(<Input id="test-input" type="text" name="test-input" placeholder="Test input" />)

    const input = screen.queryByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('Should have an icon', () => {
    render(
      <Input
        id="test-input"
        type="text"
        name="test-input"
        placeholder="Test input"
        icon="fas fa-user"
      />
    )

    const icon = screen.queryByTestId('input-icon')
    expect(icon).toBeInTheDocument()
  })
})
