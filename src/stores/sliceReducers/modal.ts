import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_MINI_APPS } from 'assets/staticData/miniApp'
import { IdApp, MiniAppType } from 'models/miniApp'
interface ModalStateType {
	isWallModal: boolean
	modalList: Array<MiniAppType>
}

const initialState: ModalStateType = {
	isWallModal: false,
	modalList: [...DEFAULT_MINI_APPS],
}

const modalAppSlice = createSlice({
	name: 'modalApp',
	initialState,
	reducers: {
		toggleWallModal: (state, action: PayloadAction<{ value: boolean }>) => {
			const { value } = action.payload
			state.isWallModal = value
		},

		toggleAppModal: (state, action: PayloadAction<{ id: IdApp; isActivate: boolean }>) => {
			const { id, isActivate } = action.payload
			const modalSelected = state.modalList.find((modal) => modal.idApp === id)

			if (modalSelected && modalSelected.isActivated !== isActivate) {
				modalSelected.isActivated = isActivate
			}
			if (isActivate && modalSelected) {
				modalToTop(state, modalSelected)
			}
		},
		updatePositionModal: (
			state,
			action: PayloadAction<{ id: IdApp; x: number; y: number }>,
		) => {
			const modalSelected = state.modalList.find((modal) => modal.idApp === action.payload.id)
			if (!modalSelected) return
			Object.assign(modalSelected, action.payload)
		},

		updateSizeModal: (
			state,
			action: PayloadAction<{
				id: string
				x: number
				y: number
				width: number
				height: number
			}>,
		) => {
			const modalSelected = state.modalList.find((modal) => modal.idApp === action.payload.id)
			if (!modalSelected) return
			Object.assign(modalSelected, action.payload)
		},
		updateModalToTop: (state, action: PayloadAction<IdApp>) => {
			const modalSelected = state.modalList.find((modal) => modal.idApp === action.payload)
			if (!modalSelected) return
			modalToTop(state, modalSelected)
		},
	},
})

const modalToTop = (state: ModalStateType, target: MiniAppType) => {
	state.modalList.forEach((modal) => {
		modal.zIndex = modal.idApp === target.idApp ? 6 : 5
	})
}

export const {
	toggleWallModal,
	toggleAppModal,
	updatePositionModal,
	updateSizeModal,
	updateModalToTop,
} = modalAppSlice.actions

const modalAppReducer = modalAppSlice.reducer
export default modalAppReducer
