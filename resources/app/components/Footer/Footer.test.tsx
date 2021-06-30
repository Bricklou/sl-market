import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Loading component', () => {
  it('Should render a Loader', () => {
    render(<Footer />)
    const footer = screen.queryByTestId('footer')
    expect(footer).toBeInTheDocument()
  })
})
