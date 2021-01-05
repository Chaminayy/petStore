import axios from 'axios';
const baseURL = 'http://localhost:3000/'
export default {
  get (url, params, options = {}) {
    return axios.get(baseURL + url, params)
  },
  post (url, params, options = {}) {
    return axios.post(baseURL + url, params)
  },
  put (url, params, options = {}) {
    return axios.put(baseURL + url,params)
  },
  delete (url, params, options = {}) {
    return axios.delete(baseURL + url, params)
  }
}
