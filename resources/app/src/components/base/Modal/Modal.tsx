import React, { Component } from 'react'
import './modal.scss'

export interface ModalProps {
  isOpen: boolean
  closeBtn?: boolean
  title: string
  onClose: (result?: boolean) => void
  children: {
    main: JSX.Element
    footer: JSX.Element
  }
  className?: string
  icon?: string
}

/**
 * Modal component is mainly a base structure for other modals.
 * It provide render and methods.
 */
class Modal extends Component<ModalProps, {}> {
  private readonly overlayRef = React.createRef<HTMLDivElement>()

  private close(event: MouseEvent): void {
    event.preventDefault()

    if (event.target === this.overlayRef.current) {
      this.props.onClose()
    }
  }

  public componentDidMount(): void {
    if (this.overlayRef.current) {
      this.overlayRef.current.addEventListener('click', this.close.bind(this), true)
    }
  }

  public componentWillUnmount(): void {
    if (this.overlayRef.current) {
      this.overlayRef.current.removeEventListener('click', this.close.bind(this))
    }
  }

  private showIcon(): JSX.Element | undefined {
    if (this.props.icon) {
      return (
        <span className="icon-container">
          <i className={this.props.icon} data-testid="modal-icon"></i>
        </span>
      )
    }
  }

  private showCloseButton(): JSX.Element | undefined {
    if (this.props.closeBtn) {
      return (
        <div className="close-container">
          <button
            className="close-btn"
            onClick={() => this.props.onClose()}
            data-testid="close-button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )
    }
  }

  public render(): JSX.Element | null {
    if (this.props.isOpen) {
      return (
        <div className="modal-overlay" ref={this.overlayRef} data-testid="modal-overlay">
          <div className={`modal ${this.props.className || ''}`} role="dialog">
            {this.showCloseButton()}
            <div className="modal-container">
              <div className="content">
                {this.showIcon()}
                <p className="title">{this.props.title}</p>
                <main>{this.props.children.main}</main>
                <footer>{this.props.children.footer}</footer>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default Modal
