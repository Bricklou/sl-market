import { render, screen } from '@testing-library/react'
import ErrorHandler from './ErrorHandler'

describe('Error handler component', () => {
  it("Shouldn't render messages when there's no errors", () => {
    render(
      <ErrorHandler errors={[]}>
        <p>test</p>
      </ErrorHandler>
    )
    const messages = screen.queryAllByTestId('error-msg')
    expect(messages).toStrictEqual([])
  })

  it("Should render messages when there's errors", () => {
    render(
      <ErrorHandler errors={['errors 1', 'errors 2', 'errors 3']}>
        <p>test</p>
      </ErrorHandler>
    )
    const messages = screen.queryAllByTestId('error-msg')
    expect(messages).not.toStrictEqual([])
  })

  it("Shouldn't have `error` className when there's errors", () => {
    render(
      <ErrorHandler>
        <p>test</p>
      </ErrorHandler>
    )
    const handler = screen.getByTestId('error-handler')
    expect(handler).not.toHaveClass('error')
  })
})
