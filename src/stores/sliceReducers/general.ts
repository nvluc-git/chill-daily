import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralStateType, LngType, WallpaperStateType } from 'models/general'
import { getLocalStorage } from 'utils/localStorage'

const getWallpaperFromLocal = getLocalStorage<WallpaperStateType>('wallpaper', {
	type: 'static',
	path: '/wallpapers/staticBg/staticBg4.jpg',
	fallback: '',
})
const getLangFromLocal = getLocalStorage<LngType>('lng', 'en')
const getUserFromLocal = getLocalStorage('user', null)

const initialState: GeneralStateType = {
	wallpaper: getWallpaperFromLocal,
	lng: getLangFromLocal,
	user: getUserFromLocal,
	isFocusMode: false,
}

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		changeWallpaperOnline: (state, action: PayloadAction<WallpaperStateType>) => {
			const { type, path, fallback } = action.payload
			state.wallpaper.type = type
			state.wallpaper.path = path
			state.wallpaper.fallback = fallback
		},
		changeWallpaperLocal: (state, action: PayloadAction<WallpaperStateType>) => {
			const { type, path, fallback } = action.payload
			state.wallpaper.type = type
			state.wallpaper.path = path
			state.wallpaper.fallback = fallback
		},
		changeLang: (state, action: PayloadAction<LngType>) => {
			state.lng = action.payload
		},
		toggleFocusMode: (state, action: PayloadAction<boolean>) => {
			state.isFocusMode = action.payload
		},
		setUser: (state, action: PayloadAction<string>) => {
			state.user = action.payload
		},
	},
})

export const { changeWallpaperOnline, changeWallpaperLocal, changeLang, toggleFocusMode, setUser } =
	generalSlice.actions
const generalReducer = generalSlice.reducer
export default generalReducer
