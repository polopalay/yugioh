import { useLocation, Link } from 'react-router-dom'
import { BreadCrumb } from 'primereact/breadcrumb'

const AppBreadcrumb = (props) => {
  const { routes, onMenuButtonClick } = props
  const location = useLocation()
  const activeRoute = routes.filter((route) => {
    const routesPath = route.path.split('/')
    const currentsPath = location.pathname.split('/')
    for (let i = 0; i < currentsPath.length; i++) {
      if (routesPath[i] !== currentsPath[i] && !routesPath[i].includes(':')) {
        return false
      }
    }
    return true
  })

  let items

  if (location.pathname === '/') {
    items = [{ label: 'Trang chủ' }]
  } else if (!activeRoute.length) {
    items = [{ label: '' }, { label: '' }]
  } else {
    const parent = activeRoute[0].parent || '/'

    items = [
      {
        label: (
          <Link className="p-text-secondary" to={parent}>
            {activeRoute[0].parentName}
          </Link>
        ),
      },
      { label: activeRoute[0].name },
    ]
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }

  return (
    <div className="layout-breadcrumb-container">
      <div className="layout-breadcrumb-left-items">
        {isStatic() && (
          <button type="button" className="menu-button p-link" onClick={onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>
        )}
        {<BreadCrumb model={items} className="layout-breadcrumb" />}
      </div>
    </div>
  )
}

export default AppBreadcrumb
