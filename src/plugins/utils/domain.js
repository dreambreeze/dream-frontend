import is from 'lodash'

export function createIsAuthed(store) {
  return function isAuthed(
    permissionCode,
    { isCheckRole = true, channel } = {}
  ) {
    return true
    const permission = store.getters?.codePermissions?.[permissionCode]
    const role = store.getters?.role
    const warn = (message) => {
      if (is.isDevelopment()) {
        console.warn(message)
      }
    }

    // If not configured the permission.
    if (!permission) {
      return false
    }

    const passed = {
      channel: false,
      role: false,
    }

    if (channel) {
      const channelConfig = permission.channel?.[channel]

      if (is.isArray(channelConfig)) {
        passed.channel = channelConfig.includes(role)
      } else if (is.isBoolean(channelConfig)) {
        passed.channel = channelConfig
      } else {
        warn(
          'permission.channel configure is invalid, only support [role] or boolean.'
        )
      }
    } else {
      passed.channel = true
    }

    if (isCheckRole) {
      const roles = permission.role
      if (is.isArray(roles)) {
        passed.role = roles.includes(role)
      } else {
        warn(`${permissionCode}: property of role is not an array.`)
      }
    } else {
      passed.role = true
    }

    return Object.values(passed).every((v) => v)
  }
}

export function createHasAuthed(store) {
  return function hasAuthed(permissionCode, permissionValue = 3) {
    const permission = store.getters?.codePermissions
    // If not configured the permission.
    if (!permission || !is.has(permission, permissionCode)) {
      return permissionValue === 1
    }
    return is.get(permission, permissionCode) === permissionValue
  }
}

export function createTs(router, store, i18n) {
  return function ts(message, params, { channel } = {}) {
    const name = router.currentRoute.path.split('/')[1]
    let messages = [message]

    if (channel) {
      messages.unshift(channel + '.' + message)
    }
    if (store.getters.microAppBaseUrls.includes(name)) {
      messages = messages.map((item) => name + '.' + item)
    }

    let result = message
    for (const v of messages) {
      result = i18n.t(v, params)
      if (result !== v) {
        break
      }
    }

    return result
  }
}
