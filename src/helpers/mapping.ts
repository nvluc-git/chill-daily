import { ComponentType, ElementType, lazy } from 'react'
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon'
import {
	ClockCircleOutlined,
	CloudOutlined,
	ScheduleOutlined,
	SnippetsOutlined,
	YoutubeOutlined,
} from '@ant-design/icons'

import { IdApp, TitleApp } from 'models/miniApp'
import { PriorityTaskType, StatusTaskType } from 'models/taskly'

const LazyYoutubeApp = lazy(() => import('features/Youtube'))
const LazyNoteApp = lazy(() => import('features/Note'))
const LazyTasklyApp = lazy(() => import('features/Taskly'))
const LazyTimerApp = lazy(() => import('features/Timer'))
const LazyWeatherApp = lazy(() => import('features/Weather'))

export const AppMapping: Record<IdApp, ComponentType> = {
	'Weather-App': LazyWeatherApp,
	'Youtube-App': LazyYoutubeApp,
	'Note-App': LazyNoteApp,
	'Taskly-App': LazyTasklyApp,
	'Timer-App': LazyTimerApp,
}

export const IconMapping: Record<TitleApp, ElementType<IconComponentProps>> = {
	weather: CloudOutlined,
	youtube: YoutubeOutlined,
	note: SnippetsOutlined,
	task: ScheduleOutlined,
	timer: ClockCircleOutlined,
}

export const statusColorMapping: Record<StatusTaskType, string> = {
	Pending: '#A6AEBF',
	'In Progress': '#6482AD',
	Completed: '#219F94',
}

export const priorityColorMapping: Record<PriorityTaskType, string> = {
	High: '#E41749',
	Medium: '#6927FF',
	Low: '#A0937D',
}

export const prioSortMapping: Record<PriorityTaskType, number> = {
	High: 3,
	Medium: 2,
	Low: 1,
}
