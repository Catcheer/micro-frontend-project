import {createSlice} from '@reduxjs/toolkit'


const preferencesSlice  = createSlice({
  name: 'preference',
  initialState: {
    color: 'light',
    notifications: {
        email: true,
        sms: false,
      },
  },
  reducers: {
   setColor(state){
    state.color =  state.color=='dark'?'light':'dark'
   },
   changeEmail(state){
    state.notifications.email = !state.notifications.email
  },
  changeSms(state){
    state.notifications.sms = !state.notifications.sms
  }
  },
 
})


export const  {
  setColor,
  changeEmail,
  changeSms
} = preferencesSlice .actions;


export const selectProfile = state => state.profile

export default preferencesSlice.reducer