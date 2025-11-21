import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LocationAPI, WeatherAPI } from 'models/weather'

export const locationAPI = createAsyncThunk(
	'fetchLocation',
	async (signal: AbortSignal, thunkAPI) => {
		try {
			const res = await fetch('https://get.geojs.io/v1/ip/geo.json/', { signal })
			if (!res.ok) {
				return thunkAPI.rejectWithValue('Failed to fetch location: bad response')
			}
			const data = await res.json()
			return data as LocationAPI
		} catch (error) {
			return thunkAPI.rejectWithValue(
				(error as Error).message || 'Something went wrong while getting location',
			)
		}
	},
)

export const weatherAPI = createApi({
	reducerPath: 'weatherAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://wttr.in/' }),
	endpoints: (builder) => ({
		getWeather: builder.query<WeatherAPI, string>({
			query: (city) => `${city}?format=j1`,
		}),
	}),
})

export const { useGetWeatherQuery } = weatherAPI
