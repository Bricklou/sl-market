import React, { Component } from 'react'
import Loading from '@c/base/Loading/Loading'

class LoadingView extends Component {
  public render(): JSX.Element {
    return (
      <main>
        <Loading />
      </main>
    )
  }
}

export default LoadingView
