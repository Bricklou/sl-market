import axios from 'axios'

export interface APIError {
  rule: string
  field: string
  message: string
}

const api = axios.create({
  baseURL: '/api',
})

export default api
