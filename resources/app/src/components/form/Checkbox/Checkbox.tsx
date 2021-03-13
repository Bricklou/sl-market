import React, { ChangeEventHandler, Component } from 'react'
import './checkbox.scss'

type CheckboxProps = {
  id: string
  label: string
  checked?: boolean
  className?: string
  onChange?: ChangeEventHandler
  disabled?: boolean
}

class Checkbox extends Component<CheckboxProps> {
  render() {
    return (
      <div className={`checkbox-field ${this.props.className || ''}`}>
        <input
          id={this.props.id}
          type="checkbox"
          className="checkbox"
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
        <label htmlFor={this.props.id} className="label">
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default Checkbox
