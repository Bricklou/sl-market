import { Component, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.scss'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Main from './routes'
import LoadingView from './views/base/loading_view/LoadingView'

class App extends Component {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<LoadingView />}>
          <Route component={Main} />
        </Suspense>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App
