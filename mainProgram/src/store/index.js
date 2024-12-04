import {
    configureStore
} from '@reduxjs/toolkit'

import settingSlice from './settingSlice'

const store = configureStore({
    reducer: {
        setting: settingSlice
    }
})


export default store