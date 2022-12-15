import { createSlice } from '@reduxjs/toolkit'

const firebaseReducer = createSlice({
  name: 'firebase',
  initialState: { app: null },
  reducers: {
    setApp: (state, action) => {
      return { ...state, app: action.payload }
    },
  },
})
const { actions, reducer } = firebaseReducer
export const { setApp, setAuth, setStorage } = actions
export default reducer
