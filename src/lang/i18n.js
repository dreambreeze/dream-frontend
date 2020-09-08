import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'

Vue.use(VueI18N)

const messages = {
  en,
  cn,
}

let locale = localStorage.getItem('local')
if (!locale) {
  locale = 'cn'
  localStorage.getItem('local', locale)
}

const i18n = new VueI18N({
  locale,
  messages,
})

export default i18n
