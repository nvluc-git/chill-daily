import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	defaultDataYoutubeSrc,
	YoutubeAppState,
	YoutubeSrcType,
} from 'models/youtube'
import { getLocalStorage } from 'utils/localStorage'
import { v4 as uuidv4 } from 'uuid'

const initialState: YoutubeAppState = getLocalStorage<YoutubeAppState>(
	'youtube',
	defaultDataYoutubeSrc,
)

const activateFirstVideo = (youtubeList: YoutubeSrcType[]) => {
	if (youtubeList.length > 0) {
		youtubeList[0] = { ...youtubeList[0], isActivated: true }
		return youtubeList[0].url
	}
	return ''
}

const youtubeAppSlice = createSlice({
	name: 'youtubeApp',
	initialState,
	reducers: {
		addNewSrc: (
			state,
			action: PayloadAction<{ title: string; url: string }>,
		) => {
			const { title, url } = action.payload
			const newYoutubeSrc: YoutubeSrcType = {
				id: uuidv4(),
				title,
				url,
				isActivated: false,
			}
			state.youtubeList.push(newYoutubeSrc)

			if (state.youtubeList.length === 1) {
				state.activatedVideo = url
				state.youtubeList[0].isActivated = true
			}
		},
		activeSrc: (state, action: PayloadAction<string>) => {
			const videoSelected = state.youtubeList.find(
				(video) => video.id === action.payload,
			)

			state.youtubeList = state.youtubeList.map((video) =>
				video.id === action.payload
					? { ...video, isActivated: true }
					: { ...video, isActivated: false },
			)
			state.activatedVideo = videoSelected?.url || ''
		},
		removeSrc: (state, action: PayloadAction<string>) => {
			const videoToRemove = state.youtubeList.find(
				(video) => video.id === action.payload,
			)
			state.youtubeList = state.youtubeList.filter(
				(video) => video.id !== action.payload,
			)

			if (videoToRemove?.isActivated) {
				state.activatedVideo = activateFirstVideo(state.youtubeList)
			}
		},
	},
})

export const { addNewSrc, activeSrc, removeSrc } = youtubeAppSlice.actions
const youtubeAppReducer = youtubeAppSlice.reducer
export default youtubeAppReducer
