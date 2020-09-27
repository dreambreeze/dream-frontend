import axios from 'axios'

const http = {
  get: function (path, params) {
    return axios.get(path, {
      params: params,
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
  },
}

const baseUrl = process.env.VUE_APP_BASE_URL

export default {
  async addArticle(params) {
    const res = await http.post(`${baseUrl}/system/article`, params)
    return res.data.value
  },

  async updateArticle(params) {
    const res = await http.post(`${baseUrl}/system/article`, params)
    return res.data.value
  },

  async signIn(params) {
    const res = await http.post(`${baseUrl}/system/auth/login`, params)
    return res.data.value
  },

  async signUp(params) {
    const res = await http.post(`${baseUrl}/system/user/register`, params)
    return res.data.value
  },

  logout() {
    return http.get(`${baseUrl}/system/auth/logout`)
  },

  async getSortList(params) {
    const res = await http.get(`${baseUrl}/system/sort/all`, params)
    return res.data.value
  },

  async addSort(params) {
    const res = await http.post(`${baseUrl}/system/sort`, params)
    return res.data.value
  },

  async updateSort(params) {
    const res = await http.patch(`${baseUrl}/system/sort`, params)
    return res.data.value
  },
}
