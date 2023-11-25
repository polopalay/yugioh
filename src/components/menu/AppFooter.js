import { appName } from '../../constant/config'

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <div className="footer-logo-container align-items-center">
        <img id="footer-logo" src="/assets/icon/icon.png" alt="atlantis-layout" />
        <span className="app-name">{appName}</span>
      </div>
      <span className="copyright">&#169; Hiền tài là nguyên khí quốc gia</span>
    </div>
  )
}

export default AppFooter
