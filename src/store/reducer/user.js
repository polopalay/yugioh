import { createSlice } from '@reduxjs/toolkit'
// import history from '../../History'

const userReducer = createSlice({
  name: 'user',
  initialState: { info: null },
  reducers: {
    setUserInfo: (state, action) => {
      // if (action.payload) {
      // history.push('/')
      // }
      return { ...state, info: action.payload }
    },
  },
})
const { actions, reducer } = userReducer
export const { setUserInfo } = actions
export default reducer
