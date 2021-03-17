import { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Main from './routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Route component={Main} />
      </BrowserRouter>
    )
  }
}

export default App
