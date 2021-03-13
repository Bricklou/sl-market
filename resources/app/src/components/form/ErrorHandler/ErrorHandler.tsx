import React, { Component } from 'react'
import './error-handler.scss'

type ErrorHandlerProps = {
  errors: string[]
}

class ErrorHandler extends Component<ErrorHandlerProps> {
  showErrors() {
    if (this.props.errors) {
      return this.props.errors.map((item, index) => {
        return (
          <span className="error-msg" key={index}>
            {item}
          </span>
        )
      })
    }
  }
  render() {
    return (
      <div className={this.props.errors ? 'error' : ''}>
        {this.props.children}
        {this.showErrors()}
      </div>
    )
  }
}

export default ErrorHandler
