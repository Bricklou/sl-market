import { Component } from 'react'
import './error-handler.scss'

export interface ErrorHandlerProps {
  errors?: string[]
}

/**
 * Error Handler component can contains a form input (input, checkbox, textarea, ...) and
 * render an list of errors if errors are provided.
 */
class ErrorHandler extends Component<ErrorHandlerProps> {
  private showErrors(): JSX.Element[] | undefined {
    if (this.props.errors) {
      return this.props.errors.map((item, index) => {
        return (
          <span className="error-msg" key={index} data-testid="error-msg">
            {item}
          </span>
        )
      })
    }
  }

  public render(): JSX.Element {
    return (
      <div
        className={this.props.errors && this.props.errors.length ? 'error' : ''}
        data-testid="error-handler"
      >
        {this.props.children}
        {this.showErrors()}
      </div>
    )
  }
}

export default ErrorHandler
