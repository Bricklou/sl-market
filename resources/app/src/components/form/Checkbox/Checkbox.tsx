import { ChangeEventHandler, Component } from 'react'
import './checkbox.scss'

export interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

/**
 * Checkbox component is a stylized checkbox adapted for React
 */
class Checkbox extends Component<CheckboxProps> {
  public render(): JSX.Element {
    return (
      <div className={`checkbox-field ${this.props.className || ''}`}>
        <input
          id={this.props.id}
          type="checkbox"
          className="checkbox"
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          checked={this.props.checked}
        />
        <label htmlFor={this.props.id} className="label">
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default Checkbox
