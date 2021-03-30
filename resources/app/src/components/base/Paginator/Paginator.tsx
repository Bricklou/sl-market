import { Component } from 'react'
import './paginator.scss'

interface PaginatorProps {
  pageChange: (page: number) => void
  currentPage: number
  pageLimit: number
  totalRecords: number
  maxNeighbours?: number
}

/**
 * Paginator component simplify the pagination link rendering using provided backend's paginator informations.
 */
class Paginator extends Component<PaginatorProps> {
  private readonly totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit)

  private showPrevBtn(): JSX.Element | undefined {
    if (this.props.currentPage > 1) {
      return (
        <button>
          <i className="fas fa-chevron-left"></i>
        </button>
      )
    }
  }

  private showNextBtn(): JSX.Element | undefined {
    if (this.props.currentPage < this.totalPages) {
      return (
        <button>
          <i className="fas fa-chevron-right"></i>
        </button>
      )
    }
  }

  public render(): JSX.Element {
    const pages = []

    const nbBlocks = this.props.maxNeighbours || 4
    const minPage = Math.max(1, this.props.currentPage - nbBlocks)
    const maxPage = Math.min(this.totalPages, this.props.currentPage + nbBlocks)

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(i)
    }

    if (pages.length > 1) {
      return (
        <div className="pagination-container">
          <div className="pagination">
            {this.showPrevBtn()}
            {pages.map((p) => {
              const classes = this.props.currentPage === p ? 'active' : ''
              return (
                <button key={p} className={classes} onClick={() => this.props.pageChange(p)}>
                  {p}
                </button>
              )
            })}
            {this.showNextBtn()}
          </div>
        </div>
      )
    } else {
      return <div className="pagination-container"></div>
    }
  }
}

export default Paginator
