import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import generalReducer from './sliceReducers/general'
import modalAppReducer from './sliceReducers/modal'
import youtubeAppReducer from './sliceReducers/youtube'
import tasklyAppReducer from './sliceReducers/taskly'
import weatherAppReducer from './sliceReducers/weather'
import { weatherAPI } from 'services/weatherAPI.service'

export const appStore = configureStore({
	reducer: {
		general: generalReducer,
		modals: modalAppReducer,
		youtube: youtubeAppReducer,
		taskly: tasklyAppReducer,
		weather: weatherAppReducer,
		[weatherAPI.reducerPath]: weatherAPI.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware),
})

setupListeners(appStore.dispatch)

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
