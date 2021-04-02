import React, { ChangeEventHandler, Component } from 'react'
import './input.scss'

export interface InputProps {
  id: string
  type: 'text' | 'password' | 'email' | 'search'
  name: string
  placeholder: string
  className?: string
  icon?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

/**
 * Input component is a stylised input with icon support
 */
class Input extends Component<InputProps> {
  private showIcon(): JSX.Element | undefined {
    if (this.props.icon) {
      return (
        <span className="icon" data-testid="input-icon">
          <i className={`fas fa-${this.props.icon}`} />
        </span>
      )
    }
  }

  public render(): JSX.Element {
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
