/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { classNames } from 'primereact/utils'
import { useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import history from '../../History'
import UpdateUser from './UpdateUser'
import UserInfo from './UserInfo'

const AppInlineMenu = (props) => {
  const app = useSelector((state) => state.firebase.app)
  const [currentUser, setCurrentUser] = useState(null)
  const menuRef = useRef(null)
  const auth = getAuth(app)
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user)
  })

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
              src={(currentUser && currentUser.photoURL) || '/assets/layout/images/avatar.png'}
              alt="avatar"
              style={{ width: '44px', height: '44px' }}
            />
            <span className="layout-inline-menu-text">
              {currentUser && currentUser.displayName}
            </span>
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
              {currentUser ? (
                <>
                  <li className="layout-inline-menu-action-item">
                    <button className="p-link">
                      <i className="pi pi-sign-out pi-fw" />
                      <span onClick={() => history.push('/logout')}>Đăng xuất</span>
                    </button>
                  </li>
                  <li className="layout-inline-menu-action-item">
                    <UpdateUser currentUser={currentUser} setCurrentUser={setCurrentUser} />
                  </li>
                  <li className="layout-inline-menu-action-item">
                    <UserInfo currentUser={currentUser} />
                  </li>
                </>
              ) : (
                <li className="layout-inline-menu-action-item">
                  <button className="p-link">
                    <i className="pi pi-sign-in pi-fw" />
                    <span onClick={() => history.push('/logout')}>Đăng nhập</span>
                  </button>
                </li>
              )}
            </ul>
          </CSSTransition>
        </div>
      )}
    </>
  )
}

export default AppInlineMenu
