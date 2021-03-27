import Axios from 'axios'

const axios = Axios.create()
axios.interceptors.response.use(undefined, (error) => {
  const status = error?.response?.status || null
  switch (status) {
    case 401:
      window.location.href = '/auth/login'
      throw new Error('Need login.')
    default:
      if (error instanceof Error) {
        throw error
      } else {
        console.error(error)
        throw new Error('Stop')
      }
  }
})

export function getConfiguration() {
  const devDomain =
    process.env.VUE_APP_PRODUCT_URL && process.env.VUE_APP_PRODUCT_URL.slice(8)
  const domain =
    process.env.NODE_ENV === 'development'
      ? devDomain
      : window.location.hostname
  return axios
    .get(`/v4/configuration/website/frontend-config?domain=${domain}`)
    .then(({ data }) => {
      return data
    })
}

export function getAppConfig() {
  return axios.get('/app/config').then(({ data }) => {
    return data
  })
}

export function getMe() {
  return axios.get('/v4/users/me').then(({ data }) => {
    return data
  })
}

export function getIsLogin() {
  return axios.get('/auth/islogin').then(({ data }) => {
    return data
  })
}

export function loadScript(src) {
  return new Promise(function (resolve, reject) {
    if (document.querySelector('script[src="' + src + '"]')) {
      resolve()

      return
    }

    const el = document.createElement('script')

    el.type = 'text/javascript'
    el.async = true
    el.src = src

    el.addEventListener('load', resolve)
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)

    document.head.appendChild(el)
  })
}

export function goTerms(router, store) {
  const { userInfo = {} } = store.state
  // If the user needs to agree to the terms
  const termsAgree = userInfo.profile?.agreedToTerms ?? true
  if (!termsAgree) {
    router.push('/login-terms').catch(() => {})
    return true
  }

  return false
}
