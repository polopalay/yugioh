import { Button } from 'primereact/button'
import { appName } from '../constant/config'
import history from '../History'

export default function NotFound() {
  return (
    <div className="exception-body notfound">
      <div className="exception-panel">
        <h3>Không tìm thấy</h3>
        <p>Trang bạn tìm không tồn tại.</p>

        <Button type="button" label="Trở lại trang chủ" onClick={() => history.push('/')} />
      </div>
      <div className="exception-footer align-items-center">
        <img src="/assets/icon/icon.png" className="exception-logo" alt="exception-logo" />
        <h4 className="exception-appname">{appName}</h4>
      </div>
    </div>
  )
}
