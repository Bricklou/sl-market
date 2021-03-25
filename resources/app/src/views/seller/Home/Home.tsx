import { Component } from 'react'
import './home.scss'

class SellerHome extends Component {
  render() {
    return (
      <div id="seller-home">
        <header>
          <h2 className="title">Général</h2>
        </header>
        <section className="card-grid">
          <article className="card card-orange">
            <div className="icon">
              <i className="fas fa-users"></i>
              <p className="number"></p>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

export default SellerHome
