import { CurrentWeather, HourlyWeather } from 'models/weather'

const validDesc = [
	'clear',
	'sunny',
	'partly cloudy',
	'cloudy',
	'overcast',
	'rain',
	'light rain',
	'moderate rain',
	'heavy rain',
	'showers',
	'drizzle',
	'patchy rain nearby',
	'patchy light drizzle',
	'light drizzle',
	'thunderstorms',
	'thundery showers',
	'windy',
	'dust',
	'fog',
	'mist',
	'haze',
] as const

const validIcons: Record<DescType, string> = {
	clear: '☀️',
	sunny: '🌞',
	'partly cloudy': '🌤️',
	cloudy: '🌥️',
	overcast: '☁️',
	rain: '🌧️',
	'light rain': '🌧️',
	'moderate rain': '🌧️',
	'heavy rain': '⛈️',
	showers: '🌦️',
	drizzle: '🌧️',
	'patchy rain nearby': '🌧️',
	'patchy light drizzle': '🌧️',
	'light drizzle': '🌧️',
	thunderstorms: '🌪️',
	'thundery showers': '⛈️',
	windy: '🌬️',
	dust: '💨',
	fog: '🌫️',
	mist: '🌫️',
	haze: '💨',
} as const

const validHours = ['0', '300', '600', '900', '1200', '1500', '1800', '2100'] as const

type DescType = (typeof validDesc)[number]
type PeriodType = 'morning' | 'afternoon' | 'evening' | 'night'
interface NextHours extends HourlyWeather {
	period: PeriodType
	desc: DescType | string
	icon: string
}
interface WeatherCurrent extends CurrentWeather {
	icon: string
	desc: DescType | string
}

// utils
const getIconWeather = (data: string) => {
	const value = data.trim().toLowerCase()
	const icon = validDesc.includes(value as DescType) ? validIcons[value as DescType] : '❓'
	return icon
}

const getDescWeather = (data: string) => {
	const value = data.trim().toLowerCase()
	const desc = validDesc.includes(value as DescType) ? (value as DescType) : value
	return desc
}

const timePeriod = (hour: string): PeriodType => {
	const value = Number(hour)
	if (value >= 600 && value < 1200) return 'morning'
	if (value >= 1200 && value < 1800) return 'afternoon'
	if (value >= 1800 && value < 2100) return 'evening'
	return 'night'
}

const formatHour = (hour: string): string => {
	const h = parseInt(hour) / 100
	return `${h < 10 ? `0${h}` : h}:00`
}

// use
export const getCurrentWeather = (data?: CurrentWeather) => {
	if (!data) return
	const value = data.weatherDesc[0].value
	const icon = getIconWeather(value)
	const desc = getDescWeather(value)
	const WeatherCurrent: WeatherCurrent = {
		...data,
		icon,
		desc,
	}
	return WeatherCurrent
}

export const getWeatherNextHours = (data?: HourlyWeather[]) => {
	if (!data) return

	const currentTime = new Date()
	const currentHour = currentTime.getHours() * 100
	const validNextHours = validHours.filter((t) => Number(t) > currentHour)

	const nextHours = data.reduce<NextHours[]>((hours, hour) => {
		if (validNextHours.includes(hour.time as (typeof validHours)[number])) {
			hours.push({
				...hour,
				icon: getIconWeather(hour.weatherDesc[0].value),
				period: timePeriod(hour.time),
				desc: getDescWeather(hour.weatherDesc[0].value),
				time: formatHour(hour.time),
			})
		}
		return hours
	}, [])
	return nextHours
}
