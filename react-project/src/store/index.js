import { configureStore ,combineSlices} from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import scoreSlice from './score'
import userReducer from './user'



const rootReducer = combineSlices({
  counter: counterSlice,
  score: scoreSlice,
  user:userReducer
})


const store = configureStore({
  reducer: rootReducer
})

export default store