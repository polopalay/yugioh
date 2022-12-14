import { useEffect, useRef, useState } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toast } from 'primereact/toast'
import PublicLayout from './layout/PublicLayout'
import Login from './pages/Login'
import AccessDenied from './pages/AccessDenied'
import './css/all.scss'
import Loading from './pages/Loading'
import store from './store/store'
import { isNotLoading } from './store/reducer/loading'
import { setConfirm, setToast } from './store/reducer/notify'
import Confirmation from './components/form/Confirmation'

function App() {
  const loading = useSelector((state) => state.loading)
  const [visible, setVisible] = useState(false)
  const [confirmation, setConfirmation] = useState({ action: null, body: '' })
  const toggle = () => setVisible(!visible)
  const toast = useRef()

  useEffect(() => {
    store.dispatch(isNotLoading())
  }, [])
  useEffect(() => {
    store.dispatch(
      setToast((data) =>
        toast.current.show({
          severity: data.type,
          summary: data.message,
          detail: '',
          life: 800,
        }),
      ),
    )
    store.dispatch(
      setConfirm((data) => {
        toggle()
        if (data) setConfirmation(data)
      }),
    )
  }, [toast])
  return (
    <>
      <Toast ref={toast} />
      <Confirmation
        visible={visible}
        toggle={toggle}
        onClick={(confirm) => {
          if (confirm && confirmation.action) {
            confirmation.action()
          }
          toggle()
        }}
        header="Xác nhận"
        body={confirmation.body}
      />
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <Route
            path="/logout"
            exact
            render={() => {
              // localStorage.clear()
              return <Redirect from="/logout" to="/login" />
            }}
          />
          <Route path="/accessDenied" component={AccessDenied} />
          <Route path="/login" component={Login} />
          <Route path="/" component={PublicLayout} />
        </Switch>
      )}
    </>
  )
}

export default withRouter(App)
