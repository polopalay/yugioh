import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: { info: {}, actions: [], users: [] },
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, info: action.payload }
    },
    setActions: (state, action) => {
      return { ...state, actions: action.payload }
    },
    setUsers: (state, action) => {
      return { ...state, users: action.payload }
    },
  },
})
const { actions, reducer } = userReducer
export const { setUserInfo, setActions, setUsers } = actions
export default reducer
