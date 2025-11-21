import { RootState } from 'stores'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'helpers/redux'

import Welcome from 'components/Welcome'
import { FrownOutlined } from '@ant-design/icons'
import Wrapper from 'layouts/Wrapper'
import { message } from 'antd'
import clsx from 'clsx'

export const App = () => {
	const user = useAppSelector((store: RootState) => store.general.user)
	const lng = useAppSelector((store: RootState) => store.general.lng)

	const [isTablet, setIsTablet] = useState<boolean>(false)
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

	useEffect(() => {
		if (user) {
			const welcomeText =
				lng === 'en'
					? `Welcome ${user} to Chill Daily app !`
					: `Chào mừng ${user} đến với Chill Daily`

			return message.info(welcomeText)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (windowWidth < 1024) {
			setIsTablet(true)
		} else {
			setIsTablet(false)
		}
	}, [windowWidth])

	return (
		<>
			{!user && <Welcome />}

			{isTablet && (
				<section
					id="tablet-phone-app"
					className="fixed w-screen h-screen top-0 left-0 bg-[#44475A] flex flex-col gap-10 justify-center items-center text-white"
					style={{ zIndex: 200 }}
				>
					<FrownOutlined style={{ color: 'white', fontSize: 100 }} />
					<div className="text-xl font-bold">
						{lng === 'en'
							? 'The application does not support phones and tablets.'
							: 'Ứng dụng này không hỗ trợ điện thoại và máy tính bảng.'}
					</div>
				</section>
			)}

			<div id='chill-daily' className={clsx(user ? '' : 'hidden')}>
				<Wrapper />
			</div>
		</>
	)
}
