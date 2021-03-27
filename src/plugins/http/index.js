import Axios from 'axios'
import errorHandler from './error'

Axios.defaults.baseURL = ''
Axios.defaults.timeout = 30000
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.responseType = 'json'

function getSNEntityUid(store) {
  let entityInfo
  try {
    entityInfo = JSON.parse(window.sessionStorage.getItem('entityInfo')) || {}
  } catch (error) {
    entityInfo = {}
    console.error(error)
  }

  const { entityUid, role } = entityInfo
  if (role === store.getters.role) {
    return entityUid || ''
  } else {
    return ''
  }
}

const axios = Axios.create()
axios.interceptors.response.use(undefined, (error) => errorHandler(error))
axios.interceptors.request.use((request) => {
  /* global globalThis */
  // Configure http request headers.
  const store = globalThis.microAppData.store
  const httpHeaders = store.state.httpHeaders
  Object.entries(httpHeaders).forEach(([key, value]) => {
    request.headers.common[key] = value
  })

  const snEntityUid = getSNEntityUid(store)
  if (snEntityUid) {
    request.headers.common['X-SN-ENTITY-UID'] = snEntityUid
  }

  // Avoid getting request cache on IE
  if (request.method === 'get') {
    request.headers.common.Pragma = 'no-cache'
    request.headers.common.Expires = '-1'
  }

  return request
})

export default axios
