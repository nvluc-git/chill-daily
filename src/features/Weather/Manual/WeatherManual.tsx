import { CloudOutlined } from '@ant-design/icons'
import { Button, Flex, Select } from 'antd'
import { CITY_LIST } from 'assets/staticData/cityList'
import { useAppDispatch } from 'helpers/redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setManualLocation } from 'stores/sliceReducers/weather'

interface OptionType {
	value: string
	label: string
}

export const WeatherManual = () => {
	const { t } = useTranslation('weather')
	const dispatch = useAppDispatch()

	const [selectRegion, setSelectRegion] = useState<OptionType>({ value: '', label: '' })

	const handleSelectCity = (_: unknown, option?: OptionType | OptionType[] | undefined) => {
		if (Array.isArray(option)) return
		else if (option) {
			const { label, value } = option
			setSelectRegion({
				value: value,
				label: label,
			})
		} else return
	}
	const handleSubmitCity = () => {
		const { label, value } = selectRegion
		if (!label && !value) return
		dispatch(setManualLocation(selectRegion))
	}

	return (
		<div id="location-input" className='px-2'>
			<Flex
				vertical
				justify="flex-start"
				align="center"
				gap={5}
				className="text-white font-bold "
			>
				<CloudOutlined style={{ fontSize: 200 }} />
			</Flex>
			<Flex align="center" justify="center" gap={10}>
				<Select
					className="flex-1"
					onChange={handleSelectCity}
					value={selectRegion.value.length === 0 ? null : selectRegion.value}
					placeholder="Select your city in here"
					showSearch
					filterOption={(input, option) =>
						option?.label.toLocaleLowerCase().includes(input.toLowerCase()) ?? false
					}
					options={CITY_LIST.map((city) => ({
						value: city.value.toLowerCase(),
						label: city.title,
					}))}
				/>
				<Button onClick={handleSubmitCity}>{t('confirmBtn')}</Button>
			</Flex>
		</div>
	)
}
