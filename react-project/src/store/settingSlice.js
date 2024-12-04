
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navTopHight: 0,
    isSubApp:false,//是否作为微应用运行
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setNavTopHight: (state, action) => {
            state.navTopHight = action.payload
        },
        setIsSubApp: (state, action) => {
            state.isSubApp = action.payload
        }
    },
})


export const { setNavTopHight,setIsSubApp } = settingSlice.actions
export const selectSetting = (state) => state.setting
export default settingSlice.reducer