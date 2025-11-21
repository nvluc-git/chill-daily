import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { AppMapping } from 'helpers/mapping'
import { useAppDispatch } from 'helpers/redux'
import { MiniAppType } from 'models/miniApp'
import { ComponentType, Suspense, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Rnd } from 'react-rnd'
import {
	toggleAppModal,
	updatePositionModal,
	updateSizeModal,
	updateModalToTop,
} from 'stores/sliceReducers/modal'

type ModalContentType = MiniAppType

export const ModalItem = ({
	idApp,
	title,
	x,
	y,
	height,
	width,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
	zIndex,
	isActivated,
}: ModalContentType) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation(['menuBar', 'general'])

	const MiniAppComponent: ComponentType = AppMapping[idApp]
	const rndProps = {
		default: {
			x,
			y,
			width,
			height,
		},
		dragHandleClassName: 'drag-handle',
		bounds: 'parent',
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		enableResizing: {
			right: true,
		},
		style: { zIndex },
		className: 'overflow-hidden rounded-lg shadow-2xl modalShadow',
	}

	const handleDragStop = useCallback(
		(_: unknown, { x, y }: { x: number; y: number }) => {
			dispatch(updatePositionModal({ id: idApp, x, y }))
		},
		[dispatch, idApp],
	)

	const handleResizeStop = useCallback(
		(
			_: unknown,
			__: unknown,
			ref: HTMLElement,
			___: unknown,
			{ x, y }: { x: number; y: number },
		) => {
			const width = ref.offsetWidth
			const height = ref.offsetHeight
			dispatch(updateSizeModal({ id: idApp, x, y, width, height }))
		},
		[dispatch, idApp],
	)

	const handleCloseModal = useCallback(() => {
		dispatch(toggleAppModal({ id: idApp, isActivate: false }))
	}, [dispatch, idApp])

	const handleSetModalTop = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const targetElement = event.target as HTMLElement
			const isClick = targetElement.closest('.btnClose')
			if (isClick) return
			dispatch(updateModalToTop(idApp))
		},
		[dispatch, idApp],
	)

	if (!isActivated) return null

	return (
		<Rnd {...rndProps} onDragStop={handleDragStop} onResizeStop={handleResizeStop}>
			{/* Rnd-title */}
			<Flex
				justify="space-between"
				align="center"
				className="!px-2 !py-1  bg-[#44475A] drag-handle"
				style={{ cursor: 'move' }}
				onMouseDown={handleSetModalTop}
			>
				<span className="titleModal text-xs">{t(title)}</span>
				<Button
					type="text"
					size="small"
					color="red"
					variant="text"
					icon={<CloseOutlined />}
					onClick={handleCloseModal}
					className="btnClose"
				/>
			</Flex>
			{/* Rnd-content */}
			<div
				className="relative w-full bg-[rgba(68,71,90,0.6)]"
				style={{ height: 'calc(100% - 32px)' }}
			>
				<Suspense
					fallback={
						<Flex
							justify="center"
							align="center"
							gap={10}
							vertical
							className="!pt-5 !text-white"
						>
							<LoadingOutlined />
							<div>{t('general:loading')}</div>
						</Flex>
					}
				>
					{MiniAppComponent ? (
						<MiniAppComponent />
					) : (
						<div>{t('general:appNotfound')}</div>
					)}
				</Suspense>
			</div>
		</Rnd>
	)
}
