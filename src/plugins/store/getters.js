export default {
  role: (state) => {
    return state.userInfo.role || 'guest'
  },
  microAppNames: (state, getters) => {
    const microApp = state.frontendConfig?.settings?.microApp || {}
    return Object.keys(microApp).map((key) => microApp[key].productName)
  },
  microAppBaseUrls: (state, getters) => {
    const microApp = state.frontendConfig?.settings?.microApp || {}
    return Object.keys(microApp).map((key) => {
      return (microApp[key].basePath || '').replace(/^\/*/, '').replace(/\/*$/, '')
    })
  },
  codePermissions: (state, getters) => {
    return (
      JSON.parse(state.userInfo?.roleConfiguration?.permissionJsonInfo) || {}
    )
  },
  pagePermissions: (state, getters) => {
    const permissions = state.frontendConfig?.permission?.page || {}
    const role = getters.role
    return Object.entries(permissions).reduce((items, [name, config]) => {
      const listType = config.listType || 'white'
      const listData = config.listData || []

      if (listType === 'white') {
        if (listData.includes(role)) {
          items[name] = true
        }
      } else {
        if (!listData.includes(role)) {
          items[name] = true
        }
      }

      return items
    }, {})
  },
  sidebarData: (state, getters) => (route) => {
    const menuList = state?.userInfo?.roleConfiguration?.menuVOList || []

    const parentTopMenuId = (function getParentTopMenuId(menuList, parentId) {
      const includesPath = (path, childrenPaths) => {
        const paths =
          typeof childrenPaths === 'string' ? childrenPaths.split(',') : []
        return path === route.path || paths.includes(route.path)
      }
      const targetMenuItem = parentId
        ? menuList.filter((v) => v.menuId === parentId)[0]
        : menuList.filter((v) => includesPath(v.path, v.childPath))[0]

      if (!targetMenuItem) return ''

      switch (targetMenuItem.type) {
        case 'sideBar':
          if (targetMenuItem.menuId + '' !== '0') {
            return getParentTopMenuId(menuList, targetMenuItem.parentMenuId)
          } else {
            console.warn(
              'This menu item type is [sideBar] but menuId is [0] =>' +
              targetMenuItem,
            )
            return ''
          }

        case 'topMenu':
          return targetMenuItem.menuId

        default:
          console.warn('This menu item type is error!  =>' + targetMenuItem)
          return ''
      }
    })(menuList)

    const allSidebarItems = []

    const sideBarTreeData = parentTopMenuId
      ? (function getTreeData(menuList, parentId) {
        return menuList.map((e) => {
          if (
            e.parentMenuId + '' === parentId + '' &&
            e.type === 'sideBar'
          ) {
            const data = {
              label: e.name,
              key: e.menuId,
              type: e.type,
              displayOrder: e.displayOrder,
              parentMenuId: e.parentMenuId,
              path: e.path,
              visibility: true,
            }
            const childrenData = getTreeData(menuList, e.menuId)
            if (childrenData.length > 0) data.children = childrenData
            allSidebarItems.push(data.path)
            if (e.childPath) allSidebarItems.push(...e.childPath.split(','))
            return data
          } else {
            return false
          }
        }).filter((v) => v !== false).sort(function (a, b) {
          return a.displayOrder * 1 - b.displayOrder * 1
        })
      })(menuList, parentTopMenuId)
      : []

    return allSidebarItems.includes(route.path) ? sideBarTreeData : []
  },
  whitelistUrl(state, getters) {
    let result
    try {
      result = JSON.parse(window.sessionStorage.getItem('whitelistUrl')) || []
    } catch (error) {
      result = []
      console.error(error)
    }

    return result
  },
}
