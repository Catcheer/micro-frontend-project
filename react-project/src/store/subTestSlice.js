
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  a: 0
}

const subTestSlice = createSlice({
  name: 'subTest',
  initialState,
  reducers: {
    incrementSub: (state, action) => {
      state.a += action.payload
    }
  }
})

export const selectSubTest = state => state.user.profile.subTest.a

export const { incrementSub } = subTestSlice.actions
export default subTestSlice.reducer