import { combineReducers } from '@reduxjs/toolkit';
import perferencesSlice from './preferencesSlice';
import profileSlice from './profileSlice';


const userReducer = combineReducers({
    preference: perferencesSlice,
    profile: profileSlice
})


export default userReducer