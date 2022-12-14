/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable max-lines-per-function */
import React from 'react'
import { classNames } from 'primereact/utils'
import AppMenu from './AppMenu'
import history from '../../History'
import { appName } from '../../constant/config'

const AppTopbar = (props) => {
  return (
    <>
      <div className="layout-topbar">
        <div className="layout-topbar-left">
          <button className="topbar-menu-button p-link" onClick={props.onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>

          <button className="logo p-link" onClick={() => history.push('/')}>
            <img src="/assets/icon/icon.png" alt="logo" />
          </button>

          <b className="ml-2">{appName}</b>
        </div>

        <AppMenu
          model={props.items}
          menuMode={props.menuMode}
          colorScheme={props.colorScheme}
          menuActive={props.menuActive}
          activeInlineProfile={props.activeInlineProfile}
          onSidebarMouseOver={props.onSidebarMouseOver}
          onSidebarMouseLeave={props.onSidebarMouseLeave}
          toggleMenu={props.onToggleMenu}
          onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
          onMenuClick={props.onMenuClick}
          onRootMenuItemClick={props.onRootMenuItemClick}
          onMenuItemClick={props.onMenuItemClick}
        />

        <div className="layout-topbar-right">
          <ul className="layout-topbar-right-items">
            <li
              id="profile"
              className={classNames('profile-item', {
                'active-topmenuitem': props.topbarMenuActive,
              })}
            >
              <button className="p-link" onClick={props.onTopbarItemClick}>
                <img src="/assets/layout/images/avatar.png" alt="profile" />
              </button>

              <ul className="fadeInDown">
                <li role="menuitem">
                  <button className="p-link" onClick={() => history.push('/logout')}>
                    <i className="pi pi-fw pi-sign-out" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AppTopbar
