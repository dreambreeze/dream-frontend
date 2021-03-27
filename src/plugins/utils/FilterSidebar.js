/**
 * Example:
 *
 * const filter = new FilterSidebar(menus)
 * filter.exclude({a: true}).include({a: true, b: true}).toArray()
 */
export class FilterSidebar {
  constructor(menus = []) {
    this.menus = JSON.parse(JSON.stringify(menus))
  }

  filterByRoute(routes, key = 'name') {
    this.menus = collect(this.menus, routes, (v) => v, key)

    return this
  }

  include(keys, key = 'key') {
    this.menus = collect(this.menus, keys, (v) => v, key)
    return this
  }

  exclude(keys, key = 'key') {
    this.menus = collect(this.menus, keys, (v) => !v, key)
    return this
  }

  collect(keys, key, pass = (v) => v) {
    this.menus = collect(this.menus, keys, pass, key)
    return this
  }

  toArray() {
    return this.menus
  }
}

function collect(menus, keys, pass, key) {
  const result = []

  menus.forEach((menu) => {
    if (pass(keys[menu[key]])) {
      result.push(menu)
    } else if (pass(false)) {
      // when exclude, if the parent filter, the children always filter.
      return
    }

    if (menu.children?.length) {
      const children = []
      let hasChild = false

      menu.children.forEach((child) => {
        if (pass(keys[child[key]] || false)) {
          hasChild = true
          children.push(child)
        }
      })

      menu.children = children
      if (hasChild && !result.includes(menu)) {
        result.push(menu)
      }
    }
  })

  return result
}
