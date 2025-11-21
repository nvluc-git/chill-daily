export type LngType = 'en' | 'vi'

export type BgType = 'static' | 'live' | 'custom'

export type BgLiveSrc = {
	thumbnail: string
	path: string
}

export interface WallpaperStateType {
	type: BgType
	path: string
	fallback: string
}

export interface GeneralStateType {
	wallpaper: WallpaperStateType
	lng: LngType
	user: string | null
	isFocusMode: boolean
}

export interface SongType {
	title: string
	path: string
}
