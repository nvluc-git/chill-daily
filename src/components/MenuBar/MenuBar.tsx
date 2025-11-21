import { Flex, message } from 'antd'
import { ArrowsAltOutlined, PictureOutlined, TranslationOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from 'helpers/redux'

import { ElementType, useCallback, useState } from 'react'
import { IconMapping } from 'helpers/mapping'
import { RootState } from 'stores'
import { changeLang, toggleFocusMode } from 'stores/sliceReducers/general'
import { useTranslation } from 'react-i18next'
import { setLocalStorage } from 'utils/localStorage'
import { LngType } from 'models/general'
import { toggleAppModal, toggleWallModal } from 'stores/sliceReducers/modal'
import { IdApp } from 'models/miniApp'

export const MenuBar = () => {
	const dispatch = useAppDispatch()
	const lang = useAppSelector((store: RootState) => store.general.lng)
	const modalList = useAppSelector((store: RootState) => store.modals.modalList)
	const { i18n, t } = useTranslation(['menuBar'])
	const [isChanging, setIsChanging] = useState<boolean>(false)

	const handleOpenModalWall = useCallback(() => {
		dispatch(toggleWallModal({ value: true }))
	}, [dispatch])

	const handleChangeLang = useCallback(() => {
		if (isChanging)
			return message.warning(
				lang === 'vi'
					? 'Bạn đang thay đổi ngôn ngữ quá nhanh, hãy thử lại sau 5 giây!'
					: 'You are changing the language too fast, try again after 5 seconds!',
			)
		const nextLang: LngType = lang === 'vi' ? 'en' : 'vi'
		dispatch(changeLang(nextLang))
		i18n.changeLanguage(nextLang)
		setIsChanging(true)
		message.info(
			lang === 'vi' ? 'Language changed to English' : 'Ngôn ngữ đã đổi sang Tiếng Việt',
		)
		setTimeout(() => setIsChanging(false), 5000)
		setLocalStorage<LngType>('lng', nextLang)
	}, [dispatch, i18n, lang, isChanging])

	const handleOpenModalMiniApp = useCallback(
		(id: IdApp) => {
			dispatch(toggleAppModal({ id, isActivate: true }))
		},
		[dispatch],
	)
	const handleToggleFocusMode = () => {
		dispatch(toggleFocusMode(true))
	}

	const renderBtnModal = modalList.map((app) => {
		const Icon: ElementType = IconMapping[app.title]
		return (
			<button
				key={app.idApp}
				type="button"
				className={clsx(app.isActivated ? 'opacity-50' : 'cursor-pointer', 'tooltip')}
				onClick={() => handleOpenModalMiniApp(app.idApp)}
			>
				<Icon className="text-xl glowingIcon" />
				{!app.isActivated && (
					<span className="tooltipText glowingText">{t(`${app.title}`)}</span>
				)}
			</button>
		)
	})

	return (
		<section id="menu-bar">
			<Flex justify="flex-end" align="center" gap={25}>
				<button
					type="button"
					className="tooltip cursor-pointer"
					onClick={handleToggleFocusMode}
				>
					<ArrowsAltOutlined className="text-xl glowingIcon" />
					<span className="tooltipText glowingText ">{t('focusMode')}</span>
				</button>

				<button
					type="button"
					className="tooltip cursor-pointer"
					onClick={handleOpenModalWall}
				>
					<PictureOutlined className="text-xl glowingIcon" />
					<span className="tooltipText glowingText">{t('menuBar:wallpaper')}</span>
				</button>

				{renderBtnModal}

				<button type="button" className="tooltip cursor-pointer" onClick={handleChangeLang}>
					<TranslationOutlined className="text-xl glowingIcon" />
					<span className="tooltipText glowingText">{lang === 'vi' ? 'Eng' : 'Vie'}</span>
				</button>
			</Flex>
		</section>
	)
}
