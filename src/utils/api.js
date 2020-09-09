import axios from 'axios'

const http = {
  get: function (path, params) {
    return axios.get(path, {
      params: params
    })
  },
  put: function (path, params) {
    return axios.put(path, params)
  },
  post: function (path, params) {
    return axios.post(path, params)
  },
  delete: function (path, params) {
    return axios.delete(path, params)
  },
  patch: function (path, params) {
    return axios.patch(path, params)
  }
}

const baseUrl = process.env.VUE_APP_BASE_URL

export default {

  saveArticle: async function (params) {
    const res = await http.post(`${baseUrl}/system/article`, params)
    return res.data.value
  }

}
