
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navTopHight: 45,
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setNavTopHight: (state, action) => {
            state.navTopHight = action.payload
        },
    },
})


export const { setNavTopHight } = settingSlice.actions
export const selectSetting = (state) => state.setting
export default settingSlice.reducer