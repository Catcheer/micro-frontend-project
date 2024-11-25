import { createSlice } from '@reduxjs/toolkit'





const scoreSlice = createSlice({
    name: 'score',
    initialState: {
      value: [66,88],
    },
    reducerPath:'score',
    reducers: {
      addScore: (state, action) => {
        state.value.splice(state.value.length,0,action.payload)
      },
      delScore:(state)=>{
        state.value.splice(state.value.length-1,1)
      },
     
      
    },
    extraReducers: (builder) => {
    
    }
  })


 



  export const { addScore, delScore } = scoreSlice.actions


  export const selectScore = state => state.score.value
  export const selectUser = state => state.score.user

  export default scoreSlice.reducer