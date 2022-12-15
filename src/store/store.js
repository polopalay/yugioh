import { configureStore } from '@reduxjs/toolkit'
import loading from './reducer/loading'
import user from './reducer/user'
import notify from './reducer/notify'
import firebase from './reducer/firebase'

const store = configureStore({
  reducer: {
    loading,
    user,
    notify,
    firebase,
  },
})
export default store
