/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { classNames } from 'primereact/utils'
import { useSelector } from 'react-redux'
import history from '../../History'

const AppInlineMenu = (props) => {
  const userInfo = useSelector((state) => state.user.info)
  const menuRef = useRef(null)

  const isSlim = () => {
    return props.menuMode === 'slim'
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }

  const isSidebar = () => {
    return props.menuMode === 'sidebar'
  }

  const isMobile = () => {
    return window.innerWidth <= 991
  }

  return (
    <>
      {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
        <div
          className={classNames('layout-inline-menu', {
            'layout-inline-menu-active': props.activeInlineProfile,
          })}
        >
          <button
            className="layout-inline-menu-action p-link"
            onClick={props.onChangeActiveInlineMenu}
          >
            <img
              src="/assets/layout/images/avatar.png"
              alt="avatar"
              style={{ width: '44px', height: '44px' }}
            />
            <span className="layout-inline-menu-text">{userInfo.fullName}</span>
            <i className="layout-inline-menu-icon pi pi-angle-down" />
          </button>
          <CSSTransition
            nodeRef={menuRef}
            classNames="p-toggleable-content"
            timeout={{ enter: 1000, exit: 450 }}
            in={props.activeInlineProfile}
            unmountOnExit
          >
            <ul ref={menuRef} className="layout-inline-menu-action-panel">
              <li className="layout-inline-menu-action-item">
                <button className="p-link">
                  <i className="pi pi-power-off pi-fw" />
                  <span onClick={() => history.go('/logout')}>Đăng xuất</span>
                </button>
              </li>
              <li className="layout-inline-menu-action-item">
                <button className="p-link">
                  <i className="pi pi-cog pi-fw" />
                  <span>Cài đặt</span>
                </button>
              </li>
            </ul>
          </CSSTransition>
        </div>
      )}
    </>
  )
}

export default AppInlineMenu
