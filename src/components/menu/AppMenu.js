import { classNames } from 'primereact/utils'
import AppSubmenu from './AppSubmenu'
import AppInlineMenu from './AppInlineMenu'
import history from '../../History'
import { appName } from '../../constant/config'

const AppMenu = (props) => {
  const {
    sidebarActive,
    pinActive,
    sidebarStatic,
    menuActive,
    activeInlineProfile,
    onSidebarMouseOver,
    onSidebarMouseLeave,
    onToggleMenu,
    onChangeActiveInlineMenu,
    onMenuClick,
    onRootMenuItemClick,
    onMenuItemClick,
    model,
    menuMode,
  } = props
  const isOverlay = () => {
    return props.menuMode === 'overlay'
  }

  const isSidebar = () => {
    return props.menuMode === 'sidebar'
  }

  return (
    <div
      className={classNames('layout-menu-wrapper', {
        'layout-sidebar-active': sidebarActive,
      })}
      onClick={onMenuClick}
      onMouseOver={onSidebarMouseOver}
      onMouseLeave={onSidebarMouseLeave}
      onFocus={() => {}}
    >
      <div className="menu-logo">
        <button type="button" className="logo p-link" onClick={() => history.push('/')}>
          <img src="/assets/icon/icon.png" alt="logo" />
        </button>
        <h3 className="mt-3 pl-2 app-name">{appName}</h3>
        <button type="button" href="#" className="menu-pin p-link" onClick={onToggleMenu}>
          {isOverlay() && <span className="pi pi-times" />}
          {isSidebar() && !sidebarStatic && pinActive && <span className="pi pi-unlock" />}
          {isSidebar() && sidebarStatic && pinActive && <span className="pi pi-lock" />}
        </button>
      </div>

      <div className="layout-menu-container">
        <AppSubmenu
          items={model}
          className="layout-menu"
          menuMode={menuMode}
          menuActive={menuActive}
          root
          parentMenuItemActive
          onMenuClick={onMenuClick}
          onMenuItemClick={onMenuItemClick}
          onRootMenuItemClick={onRootMenuItemClick}
        />
      </div>

      <AppInlineMenu
        menuMode={menuMode}
        activeInlineProfile={activeInlineProfile}
        onChangeActiveInlineMenu={onChangeActiveInlineMenu}
      />
    </div>
  )
}

export default AppMenu
