import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'
import { appName } from '../constant/config'
import history from '../History'

export default function Login() {
  const [user, setUser] = useState({ userName: '', password: '' })
  const toast = useSelector((store) => store.notify.toast)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    history.push('/')
    toast({ type: 'success', message: 'Đăng nhập thành công' })
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
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
                  value={user.userName}
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
                  value={user.password}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
