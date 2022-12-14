import { configureStore } from '@reduxjs/toolkit'
import loading from './reducer/loading'
import user from './reducer/user'
import notify from './reducer/notify'

const store = configureStore({
  reducer: {
    loading,
    user,
    notify,
  },
})
export default store
