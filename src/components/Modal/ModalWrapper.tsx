import { useAppSelector } from 'helpers/redux'
import { RootState } from 'stores'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
const LazyPhotoGallery = lazy(() => import('components/ImageGallery'))
const LazyModalItem = lazy(() => import('components/Modal/Item'))

export const ModalWrapper = () => {
	const { t } = useTranslation(['general'])

	const fallback = <div>{t('loading')}</div>

	const modalList = useAppSelector((store: RootState) => store.modals.modalList)
	const isWallModal = useAppSelector((store: RootState) => store.modals.isWallModal)

	const renderModalss = modalList.reduce<JSX.Element[]>((newModals, currentModal) => {
		if (currentModal.isActivated) {
			newModals.push(<LazyModalItem key={currentModal.idApp} {...currentModal} />)
		}
		return newModals
	}, [])

	return (
		<>
			{isWallModal && (
				<Suspense fallback={fallback}>
					<LazyPhotoGallery />
				</Suspense>
			)}
			<Suspense fallback={fallback}>{renderModalss}</Suspense>
		</>
	)
}
