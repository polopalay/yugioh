const appName = 'Hiền tài VN'
const apiUrl = '/api/'
const firebaseConfig = {
  apiKey: 'AIzaSyDSg1qdtK5SInSlBpy6v3STZjz0ufP0Jjo',
  authDomain: 'ygovn-7b578.firebaseapp.com',
  databaseURL: 'https://ygovn-7b578-default-rtdb.firebaseio.com',
  projectId: 'ygovn-7b578',
  storageBucket: 'ygovn-7b578.appspot.com',
  messagingSenderId: '93524818919',
  appId: '1:93524818919:web:645aa64b0601a321d91b42',
  measurementId: 'G-4TG65ZQFXS',
}
const adminId = 'PgCTnYZzPVYfuEdXabH8aBJQlNp1'
const menu = [
  {
    label: 'Trang chủ',
    icon: 'pi pi-home',
    to: '#',
    items: [{ label: 'Bài viết', icon: 'pi pi-book', to: '/' }],
  },
]
const adminMenu = [
  {
    label: 'Quản trị',
    icon: 'pi pi-cog',
    to: '#',
    items: [{ label: 'Bài viết', icon: 'pi pi-file', to: '/postsManager' }],
  },
]
export { apiUrl, appName, firebaseConfig, adminId, menu, adminMenu }
