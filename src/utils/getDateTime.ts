import { LngType } from "models/general"

const dateOptions: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	day: '2-digit',
	month: 'short',
	year: 'numeric',
}

const timeOptions: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
}

export const getCurrentDateTime = (isLocale: LngType) => {
	const datetime = new Date()
	const locale = isLocale === 'en' ? 'en-US' : 'vi-VN'
	const currentTime = datetime.toLocaleString(locale, timeOptions)
	const currentDate = datetime.toLocaleString(locale, dateOptions)
	return {
		time: currentTime,
		date: currentDate,
	}
}
