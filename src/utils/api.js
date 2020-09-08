const http = {
  get: function (path, params) {
    return this.$http.get(path, {
      params: params,
    })
  },
  put: function (path, params) {
    return this.$http.put(path, params)
  },
  post: function (path, params) {
    return this.$http.post(path, params)
  },
  delete: function (path, params) {
    return this.$http.delete(path, params)
  },
  patch: function (path, params) {
    return this.$http.patch(path, params)
  },
}

const baseUrl = ''

export default {

  //get collateral call filter
  getCollateralCallFilter: async function (params) {
    const res = await http.get(`${baseUrl}/user/getUserInfo`, params)
    return res.data.value
  },

}
