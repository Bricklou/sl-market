/**
 * Meta object sent when the paginator is used
 */
export interface ApiPaginationMeta {
  current_page: number
  first_page: number
  first_page_url: string
  last_page: number
  last_page_url: string
  next_page_url: string | null
  per_page: number
  previous_page_url: string | null
  total: number
}

/**
 * Paginator object generated by Adonis
 *
 * @param {any} T Paginated object
 */
export interface ApiPagination<T extends any> {
  meta: ApiPaginationMeta
  data: T[]
}

/**
 * Api error object
 */
export interface APIError {
  rule: string
  field: string
  message: string
}
