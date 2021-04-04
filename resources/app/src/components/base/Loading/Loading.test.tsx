import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading component', () => {
  it('Should render a Loader', () => {
    render(<Loading />)
    const loader = screen.queryByText(/Loading/i)
    expect(loader).toBeInTheDocument()
  })
})
