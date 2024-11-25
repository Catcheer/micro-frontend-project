import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: 'John Doe',
    age: 30,
  },
  reducers: {
    updateName(state) {
      state.name = 'lisi';
    },
    updateAge(state) {
      state.age = 33;
    },
  },
});

export const { updateName, updateAge } = profileSlice.actions;
export default profileSlice.reducer;