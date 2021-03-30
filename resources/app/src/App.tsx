import { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.scss'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Main from './routes'

class App extends Component {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <NavBar />
        <Route component={Main} />
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App
