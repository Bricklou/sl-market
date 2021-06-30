import { Component } from 'react'
import './home.scss'

export default class Home extends Component {
  public render(): JSX.Element {
    return (
      <main id="home">
        <section className="banner">
          <h1 className="title">
            Le site de vente du serveur Discord <br />
            <span className="discord-name">Support Launcher</span> !
          </h1>
        </section>
        {/**
         * TODO: add page suggestions, best sells or some things like this.
         * Maybe add more informations too.
         * */}
      </main>
    )
  }
}
