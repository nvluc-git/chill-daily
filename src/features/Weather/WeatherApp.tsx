import { useAppSelector } from 'helpers/redux'
import { RootState } from 'stores'
import { WeatherManual } from './Manual/WeatherManual'
import { WeatherDefault } from './Default/WeatherDefault'

export const WeatherApp = () => {
	const isManual = useAppSelector((store: RootState) => store.weather.isManual)

	return (
		<>
			{isManual && <WeatherManual />}
			{!isManual && <WeatherDefault />}
		</>
	)
}
