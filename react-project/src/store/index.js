import { configureStore ,combineSlices} from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import scoreSlice from './score'
import userReducer from './user'
import settingSlice from './settingSlice'
import authReducer from './authSlice'



const rootReducer = combineSlices({
  counter: counterSlice,
  score: scoreSlice,
  user:userReducer,
  setting:settingSlice,
  auth:authReducer
})


const store = configureStore({
  reducer: rootReducer
})

export default store