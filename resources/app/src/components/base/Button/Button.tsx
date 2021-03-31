import { Component } from 'react'
import './button.scss'

export type ButtonProps = {
  className?: string
  icon?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

/**
 * Button component is only an stylized button with the possibility to add an icon.
 *
 * The `loading` props has a higher priority over `icon`. If `loading` is enabled, it will
 * overwrite the rendered `icon`.
 */
class Button extends Component<ButtonProps> {
  private showIcon(): JSX.Element | undefined {
    if (this.props.icon) {
      return <i className={this.props.icon} />
    }
  }

  private showLoading(): JSX.Element | undefined {
    if (this.props.loading) {
      return <i className="loading-icon fas fa-circle-notch"></i>
    }
  }

  public render(): JSX.Element {
    return (
      <button
        className={`button ${this.props.className || ''}`}
        type={this.props.type || 'button'}
        disabled={this.props.loading || this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.loading ? this.showLoading() : this.showIcon()}
        {this.props.children}
      </button>
    )
  }
}

export default Button
