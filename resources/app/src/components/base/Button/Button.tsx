import { Component } from 'react'
import './button.scss'

type ButtonProps = {
  className?: string
  icon?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

class Button extends Component<ButtonProps> {
  showIcon() {
    if (this.props.icon) {
      return <i className={this.props.icon} />
    }
  }
  showLoading() {
    if (this.props.loading) {
      return <i className="loading-icon fas fa-circle-notch"></i>
    }
  }
  render() {
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
