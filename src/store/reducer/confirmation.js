import { createSlice } from '@reduxjs/toolkit'

const confirmationReducer = createSlice({
  name: 'confirmation',
  initialState: true,
  reducers: {
    isLoading: () => true,
    isNotLoading: () => false,
  },
})

const { actions, reducer } = confirmationReducer
export const { isLoading, isNotLoading } = actions
export default reducer
