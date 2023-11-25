import { useState } from 'react'
import { classNames } from 'primereact/utils'
import { useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import AppMenu from './AppMenu'
import history from '../../History'
import { appName } from '../../constant/config'
import UpdateUser from './UpdateUser'
import UserInfo from './UserInfo'

const AppTopbar = (props) => {
  const {
    onMenuButtonClick,
    menuMode,
    colorScheme,
    menuActive,
    activeInlineProfile,
    onSidebarMouseOver,
    onSidebarMouseLeave,
    onToggleMenu,
    onChangeActiveInlineMenu,
    onMenuClick,
    onRootMenuItemClick,
    onMenuItemClick,
    topbarMenuActive,
    onTopbarItemClick,
    items,
  } = props
  const app = useSelector((state) => state.firebase.app)
  const [currentUser, setCurrentUser] = useState(null)
  const auth = getAuth(app)
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user)
  })
  return (
    <>
      <div className="layout-topbar">
        <div className="layout-topbar-left">
          <button type="button" className="topbar-menu-button p-link" onClick={onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>

          <button type="button" className="logo p-link" onClick={() => history.push('/')}>
            <img src="/assets/icon/icon.png" alt="logo" />
          </button>

          <b className="ml-2">{appName}</b>
        </div>

        <AppMenu
          model={items}
          menuMode={menuMode}
          colorScheme={colorScheme}
          menuActive={menuActive}
          activeInlineProfile={activeInlineProfile}
          onSidebarMouseOver={onSidebarMouseOver}
          onSidebarMouseLeave={onSidebarMouseLeave}
          toggleMenu={onToggleMenu}
          onChangeActiveInlineMenu={onChangeActiveInlineMenu}
          onMenuClick={onMenuClick}
          onRootMenuItemClick={onRootMenuItemClick}
          onMenuItemClick={onMenuItemClick}
        />

        <div className="layout-topbar-right">
          <ul className="layout-topbar-right-items">
            <li
              id="profile"
              className={classNames('profile-item', {
                'active-topmenuitem': topbarMenuActive,
              })}
            >
              <button type="button" className="p-link" onClick={onTopbarItemClick}>
                <img
                  src={(currentUser && currentUser.photoURL) || '/assets/layout/images/avatar.png'}
                  alt="profile"
                />
              </button>

              <ul className="fadeInDown">
                {currentUser ? (
                  <>
                    <li role="menuitem">
                      <button type="button" className="p-link">
                        <i className="pi pi-sign-out pi-fw" />
                        <span onClick={() => history.push('/logout')}>Đăng xuất</span>
                      </button>
                    </li>
                    <li role="menuitem">
                      <UpdateUser currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    </li>
                    <li role="menuitem">
                      <UserInfo currentUser={currentUser} />
                    </li>
                  </>
                ) : (
                  <li role="menuitem">
                    <button type="button" className="p-link">
                      <i className="pi pi-sign-in pi-fw" />
                      <span onClick={() => history.push('/login')}>Đăng nhập</span>
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AppTopbar
