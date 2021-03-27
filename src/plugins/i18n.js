import Vue from 'vue'
import VueI18n from 'vue-i18n'
import message from '../lang/en.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {
    en: message,
  },
})
