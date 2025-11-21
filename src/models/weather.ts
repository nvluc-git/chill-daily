export type weatherDesc = { value: string }

export interface HourlyWeather {
	time: string
	tempC: string
	FeelsLikeC: string
	humidity: string
	cloudcover: number
	windspeedKmph: number
	weatherDesc: weatherDesc[]
}

export interface DailyWeather {
	hourly: HourlyWeather[]
}

export interface CurrentWeather {
	temp_C: string
	FeelsLikeC: string
	windspeedKmph: string
	humidity: string
	cloudcover: string
	weatherDesc: weatherDesc[]
}

export interface WeatherAPI {
	current_condition: CurrentWeather[]
	weather: DailyWeather[]
}

// Location API Type

export interface LocationAPI {
	region: string | null
	country: string | null
	city: string | null
}
