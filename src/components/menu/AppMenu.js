/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable max-lines-per-function */
import React, { createRef, forwardRef, useCallback, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { classNames } from 'primereact/utils'
import { Ripple } from 'primereact/ripple'
import AppInlineMenu from './AppInlineMenu'
import history from '../../History'
import { appName } from '../../constant/config'

const AppSubmenu = forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const onMenuItemClick = (event, item, index) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }

    // execute command
    if (item.command) {
      item.command({ originalEvent: event, item })
      event.preventDefault()
    }

    if (item.items) {
      event.preventDefault()
    }

    if (props.root) {
      props.onRootMenuItemClick({
        originalEvent: event,
      })
    }

    if (item.items) {
      setActiveIndex(index === activeIndex ? null : index)
    } else if (props.menuMode !== 'sidebar') {
      const ink = getInk(event.currentTarget)
      if (ink) {
        removeClass(ink, 'p-ink-active')
      }
    }

    props.onMenuItemClick({
      originalEvent: event,
      item,
    })
  }

  const onKeyDown = (event, item, index) => {
    if (event.key === 'Enter') {
      onMenuItemClick(event, item, index)
    }
  }

  const getInk = (el) => {
    for (let i = 0; i < el.children.length; i++) {
      if (
        typeof el.children[i].className === 'string' &&
        el.children[i].className.indexOf('p-ink') !== -1
      ) {
        return el.children[i]
      }
    }
    return null
  }

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className)
    else
      element.className = element.className.replace(
        new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
        ' ',
      )
  }

  const onMenuItemMouseEnter = (index) => {
    if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(index)
    }
  }

  const isMobile = () => {
    return window.innerWidth <= 991
  }
  const isStatic = () => {
    return props.menuMode === 'static'
  }

  const isHorizontalOrSlim = useCallback(() => {
    return props.menuMode === 'horizontal' || props.menuMode === 'slim'
  }, [props.menuMode])

  const visible = (item) => {
    return typeof item.visible === 'function' ? item.visible() : item.visible !== false
  }

  const getLink = (item, index) => {
    const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon)
    const content = (
      <>
        <i className={menuitemIconClassName} />
        <span className="layout-menuitem-text">{item.label}</span>
        {item.items && <i className="pi pi-fw pi-chevron-down  layout-submenu-toggler" />}

        <Ripple />
      </>
    )
    const commonLinkProps = {
      style: item.style,
      className: classNames(item.className, 'p-ripple', {
        'p-disabled': item.disabled,
      }),
      target: item.target,
      onClick: (e) => onMenuItemClick(e, item, index),
      onMouseEnter: () => onMenuItemMouseEnter(index),
      onKeyDown: (e) => onKeyDown(e, item, index),
    }
    return (
      <NavLink
        exact
        strict
        to={item.to}
        {...commonLinkProps}
        // className={(isActive) =>
        // classNames(
        // commonLinkProps.className,
        // isActive && item.to !== '/#' ? 'active-route' : undefined,
        // )
        // }
        activeClassName="active-route"
      >
        {content}
      </NavLink>
    )
  }

  const getItems = () => {
    const transitionTimeout =
      isHorizontalOrSlim() && !props.root
        ? { enter: 1000, exit: 450 }
        : isHorizontalOrSlim() && !isMobile()
        ? 0
        : { enter: 1000, exit: 450 }
    return props.items.map((item, i) => {
      if (visible(item)) {
        const submenuRef = createRef()
        const active = activeIndex === i
        const menuitemClassName = classNames({
          'layout-root-menuitem': props.root,
          'active-menuitem': active && !item.disabled,
        })
        const link = getLink(item, i)

        return (
          <li key={item.label || i} className={menuitemClassName} role="menuitem">
            {props.root && isStatic() && <div className="layout-menuitem-text">{item.label}</div>}
            {link}
            <CSSTransition
              nodeRef={submenuRef}
              classNames="p-toggleable-content"
              timeout={transitionTimeout}
              in={item.items && props.root && isStatic() ? true : active}
              unmountOnExit
            >
              <AppSubmenu
                ref={submenuRef}
                items={visible(item) && item.items}
                menuActive={props.menuActive}
                menuMode={props.menuMode}
                parentMenuItemActive={active}
                onMenuItemClick={props.onMenuItemClick}
              />
            </CSSTransition>
          </li>
        )
      }

      return null
    })
  }

  useEffect(() => {
    if (props.resetActiveIndex && isHorizontalOrSlim()) {
      setActiveIndex(null)
    }
  }, [props.resetActiveIndex, isHorizontalOrSlim])

  useEffect(() => {
    if (!props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(null)
    }
  }, [props.menuActive, isHorizontalOrSlim])

  if (!props.items) {
    return null
  }

  const items = getItems()
  return (
    <ul ref={ref} className={props.className} role="menu">
      {items}
    </ul>
  )
})

const AppMenu = (props) => {
  const isOverlay = () => {
    return props.menuMode === 'overlay'
  }

  const isSidebar = () => {
    return props.menuMode === 'sidebar'
  }

  return (
    <div
      className={classNames('layout-menu-wrapper', {
        'layout-sidebar-active': props.sidebarActive,
      })}
      onClick={props.onMenuClick}
      onMouseOver={props.onSidebarMouseOver}
      onMouseLeave={props.onSidebarMouseLeave}
    >
      <div className="menu-logo">
        <button className="logo p-link">
          <img src="/assets/icon/icon.png" alt="logo" onClick={() => history.push('/')} />
        </button>
        <h3 className="mt-3 pl-2 app-name">{appName}</h3>
        <button href="#" className="menu-pin p-link" onClick={props.onToggleMenu}>
          {isOverlay() && <span className="pi pi-times" />}
          {isSidebar() && !props.sidebarStatic && props.pinActive && (
            <span className="pi pi-unlock" />
          )}
          {isSidebar() && props.sidebarStatic && props.pinActive && <span className="pi pi-lock" />}
        </button>
      </div>

      <div className="layout-menu-container">
        <AppSubmenu
          items={props.model}
          className="layout-menu"
          menuMode={props.menuMode}
          menuActive={props.menuActive}
          root
          parentMenuItemActive
          onMenuClick={props.onMenuClick}
          onMenuItemClick={props.onMenuItemClick}
          onRootMenuItemClick={props.onRootMenuItemClick}
        />
      </div>

      <AppInlineMenu
        menuMode={props.menuMode}
        activeInlineProfile={props.activeInlineProfile}
        onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
      />
    </div>
  )
}

export default AppMenu
