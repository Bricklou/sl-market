import { Component } from 'react'
import './home.scss'
import api from '../../../utils/api'
import MDEditor, { commands } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'
import Button from '../../../components/base/Button/Button'
import { previewOptions } from '../../../utils/markdownPreviewer'

interface SellerHomeState {
  editOpened: boolean
  bio: string
  bioEdited?: string
}

interface ApiStatusResponse {
  bio: string
}
class SellerHome extends Component<{}, SellerHomeState> {
  public state: SellerHomeState = {
    editOpened: false,
    bio: '',
  }

  private toggleEditor(): void {
    this.setState({
      editOpened: !this.state.editOpened,
    })
  }

  public async componentDidMount(): Promise<void> {
    try {
      const response = await api.get<ApiStatusResponse>('/seller/status')

      this.setState({
        bio: response.data.bio,
      })
    } catch (error) {
      console.log(error)
    }
  }

  private showMarkdownEditor(): JSX.Element {
    return (
      <div className="editor-container">
        <MDEditor
          value={this.state.bio || ''}
          onChange={(val) => this.setState({ bioEdited: val })}
          minHeight={200}
          commands={[
            commands.bold,
            commands.strikethrough,
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
              ],
              {
                name: 'title',
                groupName: 'title',
                buttonProps: { 'aria-label': 'Insert title' },
              }
            ),
            commands.italic,
            commands.divider,
            commands.link,
            commands.quote,
            commands.code,
            commands.image,
            commands.divider,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          previewOptions={previewOptions}
        />
        <div className="action-buttons">
          <Button
            className="cancel-button"
            onClick={() => {
              this.setState({
                bioEdited: undefined,
                editOpened: false,
              })
            }}
          >
            Annuler
          </Button>
          <Button
            icon="fas fa-save"
            type="submit"
            onClick={this.saveDescription.bind(this)}
            className="save-button"
          >
            Enregistrer
          </Button>
        </div>
      </div>
    )
  }

  private async saveDescription(): Promise<void> {
    if (this.state.bioEdited !== undefined) {
      try {
        await api.put('/seller/biography', {
          content: this.state.bioEdited,
        })
        this.setState({
          bioEdited: undefined,
          bio: this.state.bioEdited,
          editOpened: false,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      this.setState({
        editOpened: false,
      })
    }
  }

  public render(): JSX.Element {
    return (
      <div id="seller-home">
        <header>
          <h2 className="title">Général</h2>
        </header>
        <section className="bio-card">
          <div className="icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="seller-bio">
            {this.state.editOpened ? (
              this.showMarkdownEditor()
            ) : this.state.bio ? (
              <MDEditor.Markdown
                source={this.state.bio}
                className="bio-container"
                {...previewOptions}
              />
            ) : (
              <span className="italic">Vous n'avez pas définis votre description</span>
            )}
          </div>

          <span className="edit-btn">
            <button onClick={this.toggleEditor.bind(this)} hidden={this.state.editOpened}>
              <i className="fas fa-edit"></i>
            </button>
          </span>
        </section>
      </div>
    )
  }
}

export default SellerHome
