export type TitleApp = 'youtube' | 'note' | 'task' | 'timer' | 'weather'
export type IdApp = 'Youtube-App' | 'Note-App' | 'Taskly-App' | 'Timer-App' | 'Weather-App'

export type MiniAppType = {
	idApp: IdApp
	title: TitleApp
	x: number
	y: number
	width: number
	height: number
	maxWidth: number
	maxHeight: number
	minWidth: number
	minHeight: number
	zIndex: number
	isActivated: boolean
}
