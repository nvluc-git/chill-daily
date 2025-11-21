import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocalStorage } from 'utils/localStorage'
import { LngType } from 'models/general'

import WELCOME_EN from 'assets/langs/en/welcome.json'
import WELCOME_VI from 'assets/langs/vi/welcome.json'

import GENERAL_EN from 'assets/langs/en/general.json'
import GENERAL_VI from 'assets/langs/vi/general.json'

import MENU_BAR_EN from 'assets/langs/en/menuBar.json'
import MENU_BAR_VI from 'assets/langs/vi/menuBar.json'

import WALLPAPER_EN from 'assets/langs/en/wallpaper.json'
import WALLPAPER_VI from 'assets/langs/vi/wallpaper.json'

import YOUTUBE_EN from 'assets/langs/en/youtube.json'
import YOUTUBE_VI from 'assets/langs/vi/youtube.json'

import WEATHER_EN from 'assets/langs/en/weather.json'
import WEATHER_VI from 'assets/langs/vi/weather.json'

import TASKLY_EN from 'assets/langs/en/taskly.json'
import TASKLY_VI from 'assets/langs/vi/taskly.json'

import TIMER_EN from 'assets/langs/en/timer.json'
import TIMER_VI from 'assets/langs/vi/timer.json'

export const resources = {
	en: {
		welcome: WELCOME_EN,
		general: GENERAL_EN,
		menuBar: MENU_BAR_EN,
		wallpaper: WALLPAPER_EN,
		youtube: YOUTUBE_EN,
		weather: WEATHER_EN,
		taskly: TASKLY_EN,
		timer: TIMER_EN,
	},
	vi: {
		welcome: WELCOME_VI,
		general: GENERAL_VI,
		menuBar: MENU_BAR_VI,
		wallpaper: WALLPAPER_VI,
		youtube: YOUTUBE_VI,
		weather: WEATHER_VI,
		taskly: TASKLY_VI,
		timer: TIMER_VI,
	},
} as const

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	resources: resources,
	lng: getLocalStorage<LngType>('lng', 'en'),
	ns: ['welcome','general', 'menuBar', 'wallpaper', 'youtube', 'weather', 'taskly', 'timer'],
	interpolation: { escapeValue: false },
})

export default i18n
