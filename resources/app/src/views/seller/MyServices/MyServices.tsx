import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/base/Button/Button'
import Loading from '../../../components/base/Loading/Loading'
import Paginator from '../../../components/base/Paginator/Paginator'
import Input from '../../../components/form/Input/Input'
import { ApiPaginationMeta } from '../../../types'
import './my-services.scss'

interface MyServicesState {
  services: object[]
  meta?: ApiPaginationMeta
  search: string
  page: number
}

export default class MyServices extends React.Component<unknown, MyServicesState> {
  public state: MyServicesState = {
    services: [],
    meta: undefined,
    search: '',
    page: 1,
  }

  private fetchServicesList(): void {}

  private showServicesTable(): JSX.Element {
    if (this.state.meta) {
      return (
        <div>
          <Paginator
            onPageChange={(page) => {
              this.setState({
                page,
              })
              this.fetchServicesList()
            }}
            currentPage={this.state.meta?.current_page}
            totalRecords={this.state.meta?.total}
            pageLimit={this.state.meta?.per_page}
            maxNeighbours={2}
          />
        </div>
      )
    } else {
      return <Loading />
    }
  }

  public render(): JSX.Element {
    return (
      <div id="my-services">
        <header>
          <h2 className="title">Mes services</h2>

          {/* Header form to search service in the whole list */}
          <div className="form-container">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                this.fetchServicesList()
              }}
            >
              <div className="relative">
                <Input
                  id="service-search"
                  placeholder="Rechercher"
                  icon="fas fa-search"
                  type="search"
                  name="service-search"
                  onChange={(event) => {
                    this.setState({ search: event.target.value })
                  }}
                />
              </div>
              <Button icon="fas fa-search" className="search-button">
                Chercher
              </Button>
              <Link className="add-service button" to="/mes-services/services/nouveau">
                <i className="fas fa-plus"></i>
              </Link>
            </form>
          </div>
        </header>
        <div>{this.showServicesTable()}</div>
      </div>
    )
  }
}
