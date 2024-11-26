import { createSlice ,combineReducers} from '@reduxjs/toolkit';
import subTestSliceReducer from './subTestSlice'




const nameSlice = createSlice({
  name: 'name',
  initialState: 'John Doe',
  reducers: {
    updateName() {
      return 'lisi';
    }
  },
});


const ageSlice = createSlice({
  name: 'age',
  initialState: 30,
  reducers: {
    updateAge() {
      return 33;
    }
  },
});



// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     name: 'John Doe',
//     age: 30,
//   },
//   reducers: {
//     updateName(state) {
//       state.name = 'lisi';
//     },
//     updateAge(state) {
//       state.age = 33;
//     }
//   },
// });

export const profileSlice = combineReducers({
  name:nameSlice.reducer,
  age:ageSlice.reducer,
  subTest:subTestSliceReducer,
})


export const { updateName } = nameSlice.actions;
export const {  updateAge } = ageSlice.actions;
export default profileSlice;