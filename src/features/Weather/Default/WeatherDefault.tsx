import { CloudOutlined, LoadingOutlined } from '@ant-design/icons'
import { Carousel, Flex } from 'antd'
import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { locationAPI, useGetWeatherQuery } from 'services/weatherAPI.service'
import { RootState } from 'stores'
import { resetRegion } from 'stores/sliceReducers/weather'
import { getCurrentDateTime } from 'utils/getDateTime'
import { getCurrentWeather, getWeatherNextHours } from 'utils/weather'

export const WeatherDefault = () => {
	const { t } = useTranslation('weather')
	const dispatch = useAppDispatch()
	const lang = useAppSelector((store: RootState) => store.general.lng)
	const { region, city } = useAppSelector((store: RootState) => store.weather)

	const { data, isLoading, isFetching, isError, refetch } = useGetWeatherQuery(
		region ?? 'Hanoi',
		{
			skip: !region,
		},
	)

	const currentDateTime = getCurrentDateTime(lang)
	const currentlyWeather = data ? getCurrentWeather(data.current_condition[0]) : undefined
	const hourlyWeather = data ? getWeatherNextHours(data.weather[0].hourly) : undefined

	const handleResetRegion = () => {
		dispatch(resetRegion())
	}

	// handle fetch region
	useEffect(() => {
		const controller = new AbortController()
		const { signal } = controller
		if (!region) {
			dispatch(locationAPI(signal))
		}

		return () => controller.abort()
	}, [dispatch, region])

	// Handling loading data
	if (isLoading || isFetching) {
		return (
			<Flex className="text-white" vertical>
				<Flex align="center" justify="center">
					<CloudOutlined style={{ fontSize: 200 }} />
				</Flex>
				<Flex justify="center" align="center" gap={10}>
					<LoadingOutlined />
					<span>{t(isLoading ? 'loading' : 'updating')}...</span>
				</Flex>
			</Flex>
		)
	}

	// Handle error data
	if (isError) {
		return (
			<Flex
				vertical
				justify="flex-start"
				align="center"
				gap={5}
				className="text-white font-bold"
			>
				<CloudOutlined style={{ fontSize: 200 }} />
				<div className="text-center">{t('errorWeather')}</div>
			</Flex>
		)
	}

	if (!data) {
		return (
			<Flex
				vertical
				justify="flex-start"
				align="center"
				gap={5}
				className="text-white font-bold !w-full !h-full"
			>
				<CloudOutlined style={{ fontSize: 200 }} />
				<div className="text-center">{t('determiningLocation')}</div>
			</Flex>
		)
	}

	return (
		<>
			{data && currentlyWeather && hourlyWeather && (
				<section className="w-full h-full p-2">
					<Flex
						justify="space-between"
						align="center"
						className="text-white text-sm !mb-1.5 !font-bold"
					>
						<div className="">{city}</div>
						<div>{currentDateTime.date}</div>
					</Flex>

					<div
						id="currently-weather"
						className=" bg-[#6272A4] rounded-xl p-2.5 mb-2 text-white"
					>
						<Flex vertical>
							<div className="border-b-[1px] capitalize text-center font-bold text-sm">
								{t('weatherCurrent')}
							</div>

							<Flex justify="space-between" align="center">
								<Flex justify="center" align="center">
									<div className="text-[80px]">{currentlyWeather.icon}</div>
									<Flex vertical justify="center" align="flex-start" gap={5}>
										<div className="text-[20px]">
											{currentlyWeather.temp_C}°C
										</div>
										<div className="text-sm">
											{t(currentlyWeather.desc, currentlyWeather.desc)}
										</div>
									</Flex>
								</Flex>
								<Flex vertical className="text-xs !pr-2.5" gap={5}>
									<div>
										{t('feelTempC')} - {currentlyWeather.FeelsLikeC}°C
									</div>
									<div>
										{t('humidity')} - {currentlyWeather.humidity}%
									</div>
									<div>
										{t('windSpeed')} - {currentlyWeather.windspeedKmph}
										km/h
									</div>
									<div>
										{t('cloudcover')} - {currentlyWeather.cloudcover}%
									</div>
								</Flex>
							</Flex>
						</Flex>
					</div>

					<div id="hourly-weather" className="text-sm bg-[#6272A4] rounded-xl p-2.5 mb-2">
						<div className="border-b-[1px] capitalize text-center !mb-2 font-bold text-sm text-white">
							{t('nextHours')}
						</div>
						<Carousel className="fontApp">
							{hourlyWeather.map((item, index) => {
								return (
									<div key={index} className="h-36">
										<Flex
											justify="center"
											align="center"
											gap={5}
											className="text-xs text-white"
										>
											<div>{t(item.period)}</div>-<div>{item.time}</div>
										</Flex>
										<Flex
											justify="space-between"
											align="center"
											className="text-sm"
										>
											<Flex>
												<Flex justify="center" align="center">
													<div className="text-[80px]">{item.icon}</div>
													<Flex
														vertical
														justify="center"
														align="flex-start"
														className="text-white"
													>
														<div className="text-[20px]">
															{item.tempC}°C
														</div>
														<div className="text-sm">
															{t(item.desc, item.desc)}
														</div>
													</Flex>
												</Flex>
											</Flex>
											<Flex
												vertical
												gap={5}
												className="text-xs !pr-2.5 text-white"
											>
												<div>
													{t('feelTempC')} - {item.FeelsLikeC}°C
												</div>
												<div>
													{t('humidity')} - {item.humidity}%
												</div>
												<div>
													{t('windSpeed')} - {item.windspeedKmph}
													km/h
												</div>
												<div>
													{t('cloudcover')} - {item.cloudcover}%
												</div>
											</Flex>
										</Flex>
									</div>
								)
							})}
						</Carousel>
					</div>

					<div
						id="fetch-control"
						className="w-full text-center flex justify-around items-center mt-3"
					>
						<button
							className="px-2 py-1 text-white rounded text-xs up cursor-pointer  hover:bg-[#6272A4] transition-all duration-300"
							onClick={() => refetch()}
						>
							{t('updateBtn')}
						</button>
						<button
							className="px-2 py-1 text-white rounded text-xs up cursor-pointer  hover:bg-[#6272A4] transition-all duration-300"
							onClick={handleResetRegion}
						>
							{t('chooseAnotherLocation')}
						</button>
					</div>
				</section>
			)}
		</>
	)
}
