import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Button, Flex, message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useCallback, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { changeWallpaperLocal } from 'stores/sliceReducers/general'

import { WallpaperStateType } from 'models/general'
import { toggleWallModal } from 'stores/sliceReducers/modal'

import PhotoForm from './ImageForm'
import RenderPhotos from './ImageList'
import { RootState } from 'stores'

export const ImageGallery = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation(['wallpaper'])
	const currentWall = useAppSelector((store: RootState) => store.general.wallpaper.path)

	const [isStatic, setIsStatic] = useState<boolean>(true)
	const [isChanging, setIsChanging] = useState<boolean>(false)

	const handleChangeTag = (value: boolean) => {
		if (isStatic === value) return
		setIsStatic(value)
	}

	const handleChangeWallpaper = useCallback(
		({ path, type, fallback }: WallpaperStateType) => {
			if (currentWall === path) return 
			if (isChanging)
				return message.warning(t('changeToFast'))

			setIsChanging(true)
			dispatch(changeWallpaperLocal({ path, type, fallback }))
			message.success(t('wallpaperChanged'))
			setTimeout(() => setIsChanging(false), 5000)
		},
		[dispatch, t, isChanging, currentWall],
	)

	const handleCloseModalWall = () => dispatch(toggleWallModal({ value: false }))

	return (
		<section className="w-[80vw] h-[85vh] bg-[rgba(68,71,90,0.9)] fixed rounded-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50 zoomIn">
			<div className="w-full h-full relative p-5">
				<Flex vertical justify="space-between" align="center" gap={15} className="h-full">
					<Flex vertical justify="center" align="center" gap={10}>
						<h1 className="text-center text-white text-4xl">{t('title')}</h1>
						<Flex justify="center" align="center" gap={15}>
							<Button
								size="small"
								type="text"
								variant="text"
								className={clsx(
									' border-none shadow-none',
									isStatic && '!bg-slate-400 !text-white !px-5',
								)}
								onClick={() => handleChangeTag(true)}
							>
								{t('tagStatic')}
							</Button>
							<Button
								size="small"
								type="text"
								variant="text"
								className={clsx(
									' border-none shadow-none',
									!isStatic && '!bg-slate-400 !text-white !px-5',
								)}
								onClick={() => handleChangeTag(false)}
							>
								{t('tagLive')}
							</Button>
						</Flex>
					</Flex>

					<Flex
						wrap
						align="center"
						justify="center"
						gap={15}
						className="overflow-x-hidden overflow-y-auto h-fit"
						style={{ scrollbarWidth: 'none' }}
					>
						{isStatic && (
							<RenderPhotos
								handleClick={handleChangeWallpaper}
								typeImage={'static'}
							/>
						)}
						{!isStatic && (
							<RenderPhotos handleClick={handleChangeWallpaper} typeImage={'live'} />
						)}
					</Flex>

					<PhotoForm />
				</Flex>

				<Button
					type="text"
					color="red"
					variant="text"
					icon={<CloseOutlined />}
					className="!absolute top-2 right-2"
					onClick={handleCloseModalWall}
				/>
			</div>
		</section>
	)
}
