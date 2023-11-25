import { Redirect, Route, withRouter } from 'react-router'
import { useSelector } from 'react-redux'

function ProtectedRoute(props) {
  const permissions = useSelector((state) => state.user.actions)
  const { route } = props
  const isLogin = true
  const havePermission =
    !permissions ||
    !route.component.props.requirePermission ||
    permissions.find((item) => item.code === route.component.props.requirePermission) !== undefined
  return (
    <Route
      path={route.path}
      exact={route.exact}
      permission={route}
      render={() =>
        !isLogin || !havePermission ? (
          <Redirect from={route.path} to={{ pathname: '/login', state: route.path }} />
        ) : (
          route.component
        )
      }
    />
  )
}

export default withRouter(ProtectedRoute)
