import { createSlice } from '@reduxjs/toolkit'

const loadingReducer = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    isLoading: () => true,
    isNotLoading: () => false,
  },
})

const { actions, reducer } = loadingReducer
export const { isLoading, isNotLoading } = actions
export default reducer
