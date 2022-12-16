/* eslint-disable max-lines-per-function */
import { Route, withRouter, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils'
import PrimeReact from 'primereact/api'
// import { useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import ProtectedRoute from './ProtectedRoute'
import routes from '../constant/routes'
import AppMenu from '../components/menu/AppMenu'
import AppFooter from '../components/menu/AppFooter'
import AppTopbar from '../components/menu/AppTopbar'
// import { convertToMenu } from '../utils/convertToTree'
import AppBreadcrumb from '../components/menu/AppBreadcrumb'
import { adminId, adminMenu, menu } from '../constant/config'

function PublicLayout() {
  const app = useSelector((state) => state.firebase.app)
  const [currentUser, setCurrentUser] = useState(null)
  const auth = getAuth(app)
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user)
  })
  const menuMode = 'sidebar'
  // const menuMode = 'static'
  const [sidebarStatic, setSidebarStatic] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(false)
  const [pinActive, setPinActive] = useState(false)
  const [configActive, setConfigActive] = useState(false)
  const [overlayMenuActive, setOverlayMenuActive] = useState(false)
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false)
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [topbarMenuActive, setTopbarMenuActive] = useState(false)
  const [activeInlineProfile, setActiveInlineProfile] = useState(false)
  const [resetActiveIndex, setResetActiveIndex] = useState(null)
  const copyTooltipRef = useRef()
  const location = useLocation()

  PrimeReact.ripple = true

  let configClick
  let menuClick
  let searchClick = false
  let topbarItemClick

  useEffect(() => {
    if (copyTooltipRef && copyTooltipRef.current) copyTooltipRef.current.updateTargetEvents()
  }, [location])

  useEffect(() => {
    setResetActiveIndex(true)
    setMenuActive(false)
  }, [menuMode])

  const onSearchHide = () => {
    setSearchActive(false)
    searchClick = false
  }
  const isHorizontal = () => {
    return menuMode === 'horizontal'
  }

  const isSlim = () => {
    return menuMode === 'slim'
  }

  const isOverlay = () => {
    return menuMode === 'overlay'
  }

  const isDesktop = () => {
    return window.innerWidth > 991
  }

  const onInputClick = () => {
    searchClick = true
  }

  const breadcrumbClick = () => {
    searchClick = true
    setSearchActive(true)
  }

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll')
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(`(^|\\b)${'blocked-scroll'.split(' ').join('|')}(\\b|$)`, 'gi'),
        ' ',
      )
    }
  }

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false)
    setStaticMenuMobileActive(false)
  }
  const onDocumentClick = () => {
    if (!searchClick && searchActive) {
      onSearchHide()
    }

    if (!topbarItemClick) {
      setTopbarMenuActive(false)
    }

    if (!menuClick) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false)
        setResetActiveIndex(true)
      }

      if (overlayMenuActive || staticMenuMobileActive) {
        setOverlayMenuActive(false)
        setStaticMenuMobileActive(false)
      }

      hideOverlayMenu()
      unblockBodyScroll()
    }

    if (configActive && !configClick) {
      setConfigActive(false)
    }

    topbarItemClick = false
    menuClick = false
    configClick = false
    searchClick = false
  }

  const onMenuButtonClick = (event) => {
    menuClick = true

    if (isOverlay()) {
      setOverlayMenuActive((prevState) => !prevState)
    }

    if (isDesktop()) {
      setStaticMenuDesktopInactive((prevState) => !prevState)
    } else {
      setStaticMenuMobileActive((prevState) => !prevState)
    }

    event.preventDefault()
  }

  const onTopbarItemClick = (event) => {
    topbarItemClick = true
    setTopbarMenuActive((prevState) => !prevState)
    hideOverlayMenu()
    event.preventDefault()
  }

  const onToggleMenu = (event) => {
    menuClick = true

    if (overlayMenuActive) {
      setOverlayMenuActive(false)
    }

    if (sidebarActive) {
      setSidebarStatic((prevState) => !prevState)
    }

    event.preventDefault()
  }

  const onSidebarMouseOver = () => {
    if (menuMode === 'sidebar' && !sidebarStatic) {
      setSidebarActive(isDesktop())
      setTimeout(() => {
        setPinActive(isDesktop())
      }, 200)
    }
  }

  const onSidebarMouseLeave = () => {
    if (menuMode === 'sidebar' && !sidebarStatic) {
      setTimeout(() => {
        setSidebarActive(false)
        setPinActive(false)
      }, 250)
    }
  }

  const onMenuClick = () => {
    menuClick = true
  }

  const onChangeActiveInlineMenu = (event) => {
    setActiveInlineProfile((prevState) => !prevState)
    event.preventDefault()
  }

  const onRootMenuItemClick = () => {
    setMenuActive((prevState) => !prevState)
  }

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      hideOverlayMenu()
      setResetActiveIndex(true)
    }

    if (!event.item.items && (isHorizontal() || isSlim())) {
      setMenuActive(false)
    }
  }

  const layoutClassName = classNames('layout-wrapper', {
    'layout-static': menuMode === 'static',
    'layout-overlay': menuMode === 'overlay',
    'layout-overlay-active': overlayMenuActive,
    'layout-slim': menuMode === 'slim',
    'layout-horizontal': menuMode === 'horizontal',
    'layout-active': menuActive,
    'layout-mobile-active': staticMenuMobileActive,
    'layout-sidebar': menuMode === 'sidebar',
    'layout-sidebar-static': menuMode === 'sidebar' && sidebarStatic,
    'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
  })
  const appMenu = currentUser && currentUser.uid === adminId ? [...menu, ...adminMenu] : menu
  return (
    <div>
      <div className={layoutClassName} onClick={onDocumentClick}>
        <div className="layout-main">
          <AppTopbar
            items={appMenu}
            menuMode={menuMode}
            menuActive={menuActive}
            topbarMenuActive={topbarMenuActive}
            activeInlineProfile={activeInlineProfile}
            onTopbarItemClick={onTopbarItemClick}
            onMenuButtonClick={onMenuButtonClick}
            onSidebarMouseOver={onSidebarMouseOver}
            onSidebarMouseLeave={onSidebarMouseLeave}
            onToggleMenu={onToggleMenu}
            onChangeActiveInlineMenu={onChangeActiveInlineMenu}
            onMenuClick={onMenuClick}
            onMenuItemClick={onMenuItemClick}
            onRootMenuItemClick={onRootMenuItemClick}
            resetActiveIndex={resetActiveIndex}
          />
          <AppMenu
            model={appMenu}
            onRootMenuItemClick={onRootMenuItemClick}
            onMenuItemClick={onMenuItemClick}
            onToggleMenu={onToggleMenu}
            onMenuClick={onMenuClick}
            menuMode={menuMode}
            menuActive={menuActive}
            sidebarActive={sidebarActive}
            sidebarStatic={sidebarStatic}
            pinActive={pinActive}
            onSidebarMouseLeave={onSidebarMouseLeave}
            onSidebarMouseOver={onSidebarMouseOver}
            activeInlineProfile={activeInlineProfile}
            onChangeActiveInlineMenu={onChangeActiveInlineMenu}
            resetActiveIndex={resetActiveIndex}
          />

          <AppBreadcrumb
            routes={routes}
            onMenuButtonClick={onMenuButtonClick}
            menuMode={menuMode}
            onInputClick={onInputClick}
            searchActive={searchActive}
            breadcrumbClick={breadcrumbClick}
          />
          <div className="layout-main-content">
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                state={route}
                render={() =>
                  route.requireLogin ? <ProtectedRoute route={route} /> : route.component
                }
              />
            ))}
          </div>
          <AppFooter />
        </div>
      </div>
    </div>
  )
}

export default withRouter(PublicLayout)
