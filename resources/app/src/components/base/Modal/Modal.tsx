import React, { Component } from 'react'
import './modal.scss'

export interface ModalProps {
  isOpen: boolean
  showCloseBtn?: boolean
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
        <span className="mt-4 w-12 text-5xl h-14 m-auto text-indigo-500 text-center">
          <i className={this.props.icon}></i>
        </span>
      )
    }
  }

  public render(): JSX.Element {
    return (
      <div className="modal-container" ref={this.overlayRef}>
        <div
          className={`shadow-lg rounded-2xl bg-white w-2/3 m-auto p-4 max-w-lg ${this.props.className}`}
        >
          <div className="h-full w-full text-center">
            <div className="flex h-full flex-col justify-between">
              {this.showIcon()}
              <p className="text-gray-800 text-xl mt-4 font-bold">{this.props.title}</p>
              <main className="text-gray-600 text-xs py-2 px-6">{this.props.children.main}</main>
              <footer className="flex items-center justify-between gap-4 w-full mt-8">
                {this.props.children.footer}
              </footer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
