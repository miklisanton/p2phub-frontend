import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer, {userSlice}  from './features/user/userSlice'
import { trackersApi } from './features/trackers/trackersApi'

const rootReducer = combineSlices(userSlice, trackersApi)

export const makeStore = () =>{
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(trackersApi.middleware)
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
