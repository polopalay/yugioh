/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import { useLocation } from 'react-router-dom'
import { BreadCrumb } from 'primereact/breadcrumb'

const AppBreadcrumb = (props) => {
  const location = useLocation()
  const activeRoute = props.routes.filter((route) => {
    return route.path === location.pathname
  })

  let items

  if (location.pathname === '/') {
    items = [{ label: 'Trang chủ' }]
  } else if (!activeRoute.length) {
    items = [{ label: '' }, { label: '' }]
  } else {
    items = [{ label: activeRoute[0].parentName }, { label: activeRoute[0].name }]
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }

  return (
    <div className="layout-breadcrumb-container">
      <div className="layout-breadcrumb-left-items">
        {isStatic() && (
          <button className="menu-button p-link" onClick={props.onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>
        )}
        {
          // <BreadCrumb model={items} className="layout-breadcrumb" />
        }
      </div>
    </div>
  )
}

export default AppBreadcrumb
