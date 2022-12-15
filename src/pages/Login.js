/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth'
import { appName } from '../constant/config'
import history from '../History'
import store from '../store/store'
import { setUserInfo } from '../store/reducer/user'

const provider = new GoogleAuthProvider()

export default function Login() {
  const app = useSelector((state) => state.firebase.app)
  const auth = getAuth(app)
  const [userModal, setUserModal] = useState({ userName: '', password: '' })
  const toast = useSelector((state) => state.notify.toast)

  const handleChange = (e) => {
    setUserModal({ ...userModal, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, userModal.userName, userModal.password)
      .then((rs) => {
        store.dispatch(setUserInfo(rs.user))
        history.push('/')
      })
      .catch((error) => {
        toast({ type: 'error', message: error.message })
      })
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((rs) => {
        store.dispatch(setUserInfo(rs.user))
        history.push('/')
      })
      .catch((error) => {
        toast({ type: 'error', message: error.message })
      })
  }

  return (
    <>
      <div className="login-body">
        <div className="login-image">
          <img src="/assets/layout/images/pages/login-onlight.png" alt="atlantis" />
        </div>
        <div className="login-panel p-fluid">
          <div className="flex flex-column">
            <div className="flex align-items-center mb-6 logo-container">
              <img src="/assets/icon/icon.png" className="login-logo" alt="login-logo" />
              <h3 className="mt-3 pl-2 app-name">{appName}</h3>
            </div>
            <div className="form-container">
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  value={userModal.userName}
                  type="text"
                  placeholder="Tài khoản"
                  name="userName"
                  onChange={handleChange}
                  onKeyDown={onPressEnter}
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-key" />
                <InputText
                  value={userModal.password}
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  onChange={handleChange}
                  onKeyDown={onPressEnter}
                />
              </span>
            </div>
            <div className="button-container">
              <Button type="button" label="Login" onClick={handleSubmit} />
              <span>
                Đăng nhập bằng google
                <button type="button" className="p-link" onClick={loginWithGoogle}>
                  Nhấn vào đây
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
