import { Component, Fragment } from 'react'
import Button from '../../../../../components/base/Button/Button'
import Modal from '../../../../../components/base/Modal/Modal'
import { UserInfo } from '../../../../../store/modules/user'
import './deleteModal.scss'

export enum ModalResponses {
  CANCELED = 'CANCELED',
  DELETE = 'DELETE',
}

interface DeleteModalProps {
  isOpen: boolean
  user: UserInfo
  onClose: (result: ModalResponses) => void
  loading: boolean
}

/**
 * Delete modal render a simple modal and emit an event depending on the user choice.
 */
export default class DeleteModal extends Component<DeleteModalProps> {
  public render(): JSX.Element {
    return (
      <Modal
        title={`Supprimer le compte de ${this.props.user.username} ?`}
        closeBtn={true}
        isOpen={this.props.isOpen}
        onClose={() => this.props.onClose(ModalResponses.CANCELED)}
        className="delete-modal"
        icon="fas fa-trash-alt"
      >
        {{
          main: (
            <div>
              La suppression du compte est définitive et ne pourra être annulé. Si vous savez se que
              vous faites vous pouvez continuer.
            </div>
          ),
          footer: (
            <Fragment>
              <Button
                type="button"
                className="delete-btn"
                loading={this.props.loading}
                onClick={() => this.props.onClose(ModalResponses.DELETE)}
                data-testid="delete-button"
              >
                Supprimer
              </Button>
              <Button
                type="button"
                className="cancel-btn"
                onClick={() => this.props.onClose(ModalResponses.CANCELED)}
              >
                Annuler
              </Button>
            </Fragment>
          ),
        }}
      </Modal>
    )
  }
}
