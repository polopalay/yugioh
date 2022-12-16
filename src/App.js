/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { ScrollTop } from 'primereact/scrolltop'
import PublicLayout from './layout/PublicLayout'
import Login from './pages/Login'
import AccessDenied from './pages/AccessDenied'
import './css/all.scss'
import Loading from './pages/Loading'
import store from './store/store'
import { setConfirm, setToast } from './store/reducer/notify'
import Confirmation from './components/form/Confirmation'
import { firebaseConfig } from './constant/config'
import history from './History'
import { setApp } from './store/reducer/firebase'

function App() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [firebaseAuth, setFirebaseAuth] = useState(null)
  const [confirmation, setConfirmation] = useState({ action: null, body: '' })
  const toast = useRef()
  const toggle = () => setVisible(!visible)
  useEffect(() => {
    store.dispatch(
      setToast((data) =>
        toast.current.show({
          severity: data.type,
          summary: data.message,
          detail: '',
          life: 2000,
        }),
      ),
    )
    store.dispatch(
      setConfirm((data) => {
        toggle()
        if (data) setConfirmation(data)
      }),
    )
    const app = initializeApp(firebaseConfig)
    store.dispatch(setApp(app))
    setFirebaseAuth(getAuth(app))
    setLoading(false)
  }, [])
  return (
    <>
      <Toast ref={toast} />
      <ScrollTop />
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
              signOut(firebaseAuth)
              return <Redirect from="/logout" to="/" />
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
