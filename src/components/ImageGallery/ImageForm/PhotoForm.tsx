import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PictureOutlined } from '@ant-design/icons'
import { Button, Flex, Form, FormProps, Input, message } from 'antd'

import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { changeWallpaperOnline } from 'stores/sliceReducers/general'
import { RootState } from 'stores'

type FieldType = {
	urlInput: string
}

export const ImageForm = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation(['wallpaper'])
	const currentWall = useAppSelector((store: RootState) => store.general.wallpaper.path)

	const [photoForm] = Form.useForm()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isChanging, setIsChanging] = useState<boolean>(false)

	const handleGetWallpaperOnline: FormProps<FieldType>['onFinish'] = useCallback(
		(value: FieldType) => {
			setIsLoading(true)

			const urlImage = value.urlInput.trim()
			if (currentWall === urlImage) {
				setIsLoading(false)
				return
			}

			const wallpaperOnline = new Image()
			wallpaperOnline.src = urlImage

			wallpaperOnline.onload = () => {
				if (isChanging) {
					setIsLoading(false)
					return message.warning(t('changeToFast'))
				}

				setIsChanging(true)
				dispatch(
					changeWallpaperOnline({
						path: urlImage,
						type: 'custom',
						fallback: '',
					}),
				)
				setIsLoading(false)
				message.success(t('wallpaperChanged'))
				photoForm.setFieldsValue({ urlInput: '' })
				setTimeout(() => setIsChanging(false), 5000)
			}

			// Image could not be loaded
			wallpaperOnline.onerror = () => {
				setIsLoading(false)
				message.error(t('cannotLoadedImage'))
			}

			// Image was destroyed during loading
			wallpaperOnline.onabort = () => {
				setIsLoading(false)
				message.error(t('cannotLoadedImage'))
			}
		},
		[dispatch, t, photoForm, currentWall, isChanging],
	)

	return (
		<>
			<Form
				form={photoForm}
				name="wallpaperOnline"
				layout="horizontal"
				autoComplete="off"
				onFinish={handleGetWallpaperOnline}
				preserve={false}
				className="w-full"
			>
				<Flex justify="space-between" align="center" gap={10}>
					<Form.Item
						label={null}
						name="urlInput"
						validateFirst={true}
						rules={[
							{
								required: true,
								message: t('emptyURL'),
							},
							{ min: 15, message: t('greaterURL') },
							{
								pattern: /^(?!\s*$).+/,
								message: t('cannotOnlySpace'),
							},
						]}
						className="flex-1"
					>
						<Input placeholder={t('placeholder')} />
					</Form.Item>
					<Form.Item label={null}>
						<Button
							type="primary"
							htmlType="submit"
							icon={<PictureOutlined />}
							loading={isLoading}
						>
							{t('buttonSubmit')}
						</Button>
					</Form.Item>
				</Flex>
			</Form>
		</>
	)
}
