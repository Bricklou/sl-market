import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button component', () => {
  it('Should render a Button', () => {
    render(<Button>Button</Button>)
    const text = screen.queryByText(/Button/i)
    expect(text).toBeInTheDocument()
  })

  it('Should render an icon', () => {
    render(<Button icon="fas fa-user">Button</Button>)
    const icon = screen.queryByTestId('icon')

    expect(icon).toBeInTheDocument()
  })

  it('Should be disabled', () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByText(/Button/i)

    expect(button).toBeDisabled()
  })

  it('Should be loading', () => {
    render(<Button loading>Button</Button>)
    const loadingIcon = screen.getByTestId('loading-icon')

    expect(loadingIcon).toBeInTheDocument()
  })
})
