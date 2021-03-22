import { Component } from 'react'

interface LoadingProps {
  className?: string
}

class Loading extends Component<LoadingProps> {
  render() {
    return (
      <div className={this.props.className}>
        <h1>Loading</h1>
      </div>
    )
  }
}

export default Loading
