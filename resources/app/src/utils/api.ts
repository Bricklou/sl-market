import axios from 'axios'

/**
 * The Axios instance
 */
const api = axios.create({
  baseURL: '/api',
})

export default api
