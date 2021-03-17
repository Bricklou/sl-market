import React, { ChangeEventHandler, Component } from 'react'
import './input.scss'

type InputProps = {
  id: string
  type: 'text' | 'password' | 'email'
  name: string
  placeholder: string
  className?: string
  icon?: string
  onChange?: ChangeEventHandler
  disabled?: boolean
}

class Input extends Component<InputProps> {
  showIcon(): JSX.Element | undefined {
    if (this.props.icon) {
      return (
        <span className="icon">
          <i className={`fas fa-${this.props.icon}`} />
        </span>
      )
    }
  }
  render() {
    return (
      <div
        className={`input-field ${this.props.className || ''} ${
          this.props.icon ? 'with-icon' : ''
        }`}
      >
        {this.showIcon()}

        <input
          id={this.props.id}
          type={this.props.type}
          className="input"
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

export default Input
