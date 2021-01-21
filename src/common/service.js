import axios from 'axios';
const baseURL = 'http://localhost:3000/'
// const baseURL = 'http://121.196.167.112:3000/'

let i18n = {
  t: function () { }
}
export const setI18n = (I18N) => {
  i18n = I18N
}
export default {
  get (url, params, options = {}) {
    return axios.get(baseURL + url, params)
  },
  post (url, params, options = {}, id) {
    return axios.post(baseURL + url, params, options)
  },
  put (url, params, options = {}) {
    return axios.put(baseURL + url,params)
  },
  delete (url, params, options = {}) {
    return axios.delete(baseURL + url, params)
  }
}
