import axios from 'axios';
const baseURL = 'http://localhost:3000/'
export default {
  get (url, params, options = {}) {
    console.log('this is get')
    return axios.get(baseURL + url, params)
  },
  post (url, params, options = {}) {
    console.log('this is post')
    return axios.post(baseURL + url, params)
  },
  put (url, params, options = {}) {
    console.log('this is put')
    return axios.put(baseURL + url,params)
  },
  delete (url, params, options = {}) {
    console.log('this is delete')
    return axios.delete(baseURL + url, params)
  }
}
