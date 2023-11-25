import Home from '../pages/Home'
import PostDetail from '../pages/PostDetail'
import PostsManager from '../pages/PostsManager'

const routes = [
  {
    path: '/',
    exact: true,
    requireLogin: false,
    parentName: 'Trang chủ',
    name: 'Trang chủ',
    component: <Home />,
  },
  {
    path: '/postDetail/:id',
    exact: true,
    requireLogin: false,
    parentName: 'Trang chủ',
    name: 'Bài viết',
    component: <PostDetail />,
  },
  {
    path: '/postsManager',
    exact: true,
    requireLogin: false,
    parentName: 'Quản trị hệ thống',
    name: 'Quản trị bài viết',
    component: <PostsManager />,
  },
]
export default routes
