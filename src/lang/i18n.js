import Vue from 'vue'
import VueI18N from 'vue-i18n'
import cn from './cn.json'
import en from './en.json'
import {getLocaleStorage, setLocaleStorage} from "@/utils/storage";

Vue.use(VueI18N)

const messages = {
  cn,
  en,
}

let locale = getLocaleStorage()
if (!locale) {
  locale = 'cn'
  setLocaleStorage(locale)
}

const i18n = new VueI18N({
  locale,
  messages,
})

export default i18n
