import Vue from 'vue'
import VueI18N from 'vue-i18n'
import cn from './cn'
import en from './en'

Vue.use(VueI18N)

const messages = {
  cn,
  en,
}

let locale = localStorage.getItem('locale')
if (!locale) {
  locale = 'cn'
  localStorage.setItem('locale', locale)
}
console.log(locale)

const i18n = new VueI18N({
  locale,
  messages,
})

export default i18n
