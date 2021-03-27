import is from 'lodash'

const storageMethods = {
  /**
   * @param {Storage} storage
   * @param {String} key
   * @param {*} value
   */
  set(storage, key, value) {
    storage.setItem(key, JSON.stringify(value))
  },

  /**
   * @param {Storage} storage
   * @param {String} key
   * @param {*} defaultValue
   * @returns {*}
   */
  get(storage, key, defaultValue = null) {
    let result = storage.getItem(key)
    if (result === null) {
      return defaultValue
    }

    try {
      result = JSON.parse(result)
    } catch (error) {
      result = defaultValue
      console.error(error)
    }

    return result
  },

  /**
   * @param {Storage} storage
   * @param {String|String[]} key
   */
  remove(storage, keys) {
    if (is.isArray(keys)) {
      keys.forEach((key) => storage.removeItem(key))
    } else if (is.isString(keys)) {
      storage.removeItem(keys)
    }
  },

  /**
   * @param {Storage} storage
   * @param {String[]} keepKeys
   */
  clear(storage, keepKeys = []) {
    const keepEntries = keepKeys.reduce((entries, key) => {
      const value = storage.getItem(key)
      if (value !== null) {
        entries.push([key, value])
      }

      return entries
    }, [])

    storage.clear()
    keepEntries.forEach(([key, value]) => storage.setItem(key, value))
  },
}

const methods = Object.entries(storageMethods).reduce((map, [method, func]) => {
  map[`${method}LocalStorage`] = (...args) => func(window.localStorage, ...args)
  map[`${method}SessionStorage`] = (...args) =>
    func(window.sessionStorage, ...args)

  return map
}, {})

methods.removeLocalStorages = methods.removeLocalStorage
methods.removeSessionStorages = methods.removeSessionStorage

export default methods
