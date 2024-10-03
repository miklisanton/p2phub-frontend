import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer, {userSlice}  from './features/user/userSlice'
import { trackersApi } from './features/trackers/trackersApi'
import formReducer, { formSlice }  from './features/trackers/formSlice'

const rootReducer = combineSlices(userSlice, trackersApi, formSlice)

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
