import Home from '../pages/Home'

const routes = [
  {
    path: '/',
    exact: true,
    requireLogin: false,
    parentName: 'Quản trị hệ thống',
    name: 'Quản trị người dùng',
    component: <Home />,
  },
]
export default routes
