import { useEffect, useRef } from 'react'
import { RootState } from 'stores'
import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { toggleFocusMode } from 'stores/sliceReducers/general'

import Wallpaper from 'components/Wallpaper'
import Bottom from 'layouts/Bottom'
import Header from 'layouts/Header'
import ModalWrapper from 'components/Modal'
import clsx from 'clsx'

export const Wrapper = () => {
	const dispatch = useAppDispatch()
	const isFocusMode = useAppSelector((store: RootState) => store.general.isFocusMode)
	const isFocusModeRef = useRef<boolean>(isFocusMode)
	
	useEffect(() => {
		isFocusModeRef.current = isFocusMode
	}, [isFocusMode])

	useEffect(() => {
		const handleOutFocusMode = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isFocusModeRef.current) {
				dispatch(toggleFocusMode(false))
			}
		}
		window.addEventListener('keydown', handleOutFocusMode)
		return () => window.removeEventListener('keydown', handleOutFocusMode)
	}, [dispatch])

	return (
		<section
			id="main-app"
			className="w-screen h-screen overflow-hidden fixed p-0 m-0 top-0 left-0"
		>
			<Wallpaper />
			
			<section
				id="wrapper-app"
				className={clsx('w-full h-full relative zoom-in', isFocusMode ? 'hidden' : '')}
			>
				<Header />
				<Bottom />
			</section>

			<ModalWrapper />
		</section>
	)
}
