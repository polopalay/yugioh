/* eslint-disable no-restricted-syntax */
const convertToMenu = (items) => {
  for (const item of items) {
    item.label = item.name
    item.icon = item.icon || 'pi pi-align-left'
    item.to = item.link
    if (item.sons) {
      item.items = item.sons.map((i) => {
        return { ...i }
      })
      convertToMenu(item.items)
    }
  }
}

const convertToPermission = (items) => {
  for (const item of items) {
    const { sons } = item
    item.key = item.id
    item.label = item.name
    item.icon = item.icon || 'pi pi-align-left'
    item.data = { ...item, sons: undefined }
    if (sons) {
      item.children = sons
      convertToPermission(sons)
    }
  }
}
const updateToPermission = (items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const { children } = item
    item.order = i + 1
    if (children) {
      // item.children = children
      updateToPermission(children)
      item.sons = children
    }
  }
}

export { convertToMenu, convertToPermission, updateToPermission }
