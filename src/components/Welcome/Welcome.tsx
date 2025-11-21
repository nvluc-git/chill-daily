import { Button, Flex, Form, FormProps, Input, List } from 'antd'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { LngType } from 'models/general'
import { useTranslation } from 'react-i18next'
import { RootState } from 'stores'
import { changeLang, setUser } from 'stores/sliceReducers/general'
import { setLocalStorage } from 'utils/localStorage'

type FieldType = {
	userName: string
}

const data = [
	'focusMode',
	'changeWallpaper',
	'watchYoutube',
	'Note',
	'taskly',
	'timer',
	'bgMusic',
	'weather',
]

export const Welcome = () => {
	const dispatch = useAppDispatch()
	const { t, i18n } = useTranslation('welcome')

	const lng = useAppSelector((store: RootState) => store.general.lng)

	const handleChooseLng = (lng: LngType) => {
		dispatch(changeLang(lng))
		i18n.changeLanguage(lng)
		setLocalStorage<LngType>('lng', lng)
	}

	const handleStart: FormProps<FieldType>['onFinish'] = (values) => {
		dispatch(setUser(values.userName))
		setLocalStorage<string>('user', values.userName)
	}

	return (
		<section
			id="welcome-app"
			className="fixed w-2/3 h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  overflow-hidden zoom-in"
			style={{ zIndex: 199 }}
		>
			<div className="py-5 h-full relative">
				<div id="intro" className="text-[#F1FA8C]">
					<div className="text-center font-bold  uppercase text-4xl">Chill Daily</div>
					<div className="text-[12px] text-center">- {t('subTitle')} -</div>

					<div className="text-center text-sm my-5 text-white">{t('desc')}</div>
				</div>

				<List
					size="small"
					header={<div className="fontApp text-[#DBDBDB]">{t('titleFeatures')}</div>}
					dataSource={data}
					bordered
					renderItem={(item) => (
						<List.Item className="!ml-5 fontApp !text-[#DBDBDB]">{t(item, item)}</List.Item>
					)}
				/>

				<Form
					name="welcomeForm"
					autoComplete="off"
					layout="inline"
					onFinish={handleStart}
					className="!my-5"
				>
					<Flex justify="center" align="flex-start" gap={15} className="w-full">
						<Form.Item<FieldType>
							label={null}
							name="userName"
							className="!m-0 w-1/2"
							rules={[
								{
									required: true,
									message: <span className="text-xs">{t('cannotBeBlank')}</span>,
								},
								{
									min: 5,
									message: <span className="text-xs">{t('tooShort')}</span>,
								},
								{
									max: 20,
									message: <span className="text-xs">{t('tooLong')}</span>,
								},
								{
									pattern: /^(?!\s*$).+/,
									message: <span className="text-xs">{t('onlyBlank')}</span>,
								},
							]}
						>
							<Input
								className="fontApp"
								placeholder={t('inputPlaceholer')}
								addonBefore={<span className="text-white">{t('inputLabel')}</span>}
							/>
						</Form.Item>
						<Form.Item label={null} className="!m-0">
							<Button htmlType="submit">{t('startBtn')}</Button>
						</Form.Item>
					</Flex>
				</Form>

				<div id="lng-control" className="flex justify-center items-center gap-5 ">
					<span
						className={clsx(
							'px-2 py-0.5 text-xs min-w-[90px] text-center cursor-pointer rounded',
							lng === 'en' ? 'bg-white ' : 'text-black hover:bg-gray-400',
						)}
						onClick={() => handleChooseLng('en')}
					>
						English
					</span>
					<span
						className={clsx(
							'px-2 py-0.5 text-xs min-w-[90px] text-center cursor-pointer rounded',
							lng === 'en' ? 'text-black hover:bg-gray-400' : 'bg-white ',
						)}
						onClick={() => handleChooseLng('vi')}
					>
						Vietnamese
					</span>
				</div>

				<div
					id="footer-wel"
					className="w-full text-center absolute bottom-5 left-0 text-[#F1FA8C]"
				>
					{t('footer')}
				</div>
			</div>
		</section>
	)
}
