import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { locationAPI } from 'services/weatherAPI.service'

export interface WeatherState {
	region: string | null
	manualRegion: string | null
	city: string | null
	status: boolean
	isManual: boolean
}

const initialState: WeatherState = {
	city: null,
	region: null,
	manualRegion: null,
	status: false,
	isManual: false,
}

const weatherApp = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		resetRegion: (state) => {
			state.isManual = true
			state.region = null
			state.status = false
		},
		setManualLocation: (state, action: PayloadAction<{ value: string; label: string }>) => {
			const { label, value } = action.payload
			state.isManual = false
			state.region = value
			state.city = label
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(locationAPI.pending, (state) => {
				state.status = false
			})
			.addCase(locationAPI.fulfilled, (state, action) => {
				const { region, city } = action.payload
				state.region = region
				state.city = city
				state.status = true
			})
			.addCase(locationAPI.rejected, (state) => {
				state.status = false
			})
	},
})

export const { setManualLocation, resetRegion } = weatherApp.actions
const weatherAppReducer = weatherApp.reducer
export default weatherAppReducer
