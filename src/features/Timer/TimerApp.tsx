import { HighlightOutlined } from '@ant-design/icons'
import { Col, Divider, Flex, Input, Select } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
export const TimerApp = () => {
	const { t } = useTranslation('timer')

	const [hours, setHours] = useState<number>(0)
	const [minutes, setMinutes] = useState<number>(0)
	const [seconds, setSeconds] = useState<number>(0)
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [isShowTimeOut, setIsShowTimeOut] = useState<boolean>(false)
	const [note, setNote] = useState<string>('')
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const totalSeconds = hours * 3600 + minutes * 60 + seconds
	const formatTime = (num: number) => String(num).padStart(2, '0')

	const hoursList = [...Array(24).keys()]
	const secondsMiniutesList = [...Array(60).keys()]

	const playAlarm = () => audioRef.current?.play()

	const startTimer = () => {
		if (totalSeconds === 0) return
		setIsRunning((prevValue) => !prevValue)
	}
	const resetTimer = () => {
		setIsRunning(false)
		setHours(0)
		setMinutes(0)
		setSeconds(0)
		setNote('')
	}

	const exitLogTimeOut = () => {
		setIsShowTimeOut(false)
		setIsRunning(false)
		setHours(0)
		setMinutes(0)
		setSeconds(0)
		setNote('')
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
		}
	}

	useEffect(() => {
		let handleCoundown: ReturnType<typeof setInterval> | null
		if (isRunning && totalSeconds > 0) {
			handleCoundown = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 0) {
						if (minutes > 0) {
							setMinutes((prevMinutes) => prevMinutes - 1)
							return 59
						} else if (hours > 0) {
							setHours((prevHours) => prevHours - 1)
							setMinutes(59)
							return 59
						} else {
							setIsRunning(false)
							return 0
						}
					}
					return prevSeconds - 1
				})
			}, 1000)
		} else if (totalSeconds === 0 && isRunning) {
			setIsRunning(false)
			playAlarm()
			setIsShowTimeOut(true)
		}

		return () => {
			if (handleCoundown) return clearInterval(handleCoundown)
		}
	}, [hours, minutes, isRunning, totalSeconds])

	return (
		<section className="w-full h-full p-2">
			{!isShowTimeOut && (
				<Flex vertical justify="flex-start" gap={30}>
					<div className="flex justify-center items-center py-4 rounded-lg bg-[#6272A4] text-white gap-2 text-4xl">
						⏳ <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
						<span>{formatTime(seconds)}</span>⏳
					</div>

					{!isRunning && (
						<Flex justify="space-around" align="center">
							<Col span={6}>
								<div className="text-center text-white uppercase text-sm mb-1">
									{t('hours')}
								</div>
								<Select
									value={hours}
									disabled={isRunning}
									className="w-full text-center"
									onChange={(value) => setHours(Number(value))}
								>
									{hoursList.map((item) => (
										<Select.Option key={item}>{item}</Select.Option>
									))}
								</Select>
							</Col>

							<Col span={6}>
								<div className="text-center text-white uppercase text-sm mb-1">
									{t('minutes')}
								</div>
								<Select
									value={minutes}
									disabled={isRunning}
									className="w-full text-center"
									onChange={(value) => setMinutes(Number(value))}
								>
									{secondsMiniutesList.map((item) => (
										<Select.Option key={item}>{item}</Select.Option>
									))}
								</Select>
							</Col>

							<Col span={6}>
								<div className="text-center text-white uppercase text-sm mb-1">
									{t('seconds')}
								</div>
								<Select
									value={seconds}
									disabled={isRunning}
									className="w-full text-center"
									onChange={(value) => setSeconds(Number(value))}
								>
									{secondsMiniutesList.map((item) => (
										<Select.Option key={item}>{item}</Select.Option>
									))}
								</Select>
							</Col>
						</Flex>
					)}

					{!isRunning && (
						<Flex justify="flex-start" align="center">
							<div
								className="text-white border border-white text-sm p-1 rounded-tl-md rounded-bl-md bg-[#6272A4]"
								style={{ whiteSpace: 'nowrap' }}
							>
								{t('reminder')}
							</div>
							<Input
								placeholder={t('placeholder')}
								value={note}
								onChange={(e) => setNote(e.target.value)}
								className="!rounded-none !border-none"
							/>
							<div className="text-white border border-white text-sm p-1 rounded-tr-md rounded-br-md bg-[#6272A4] px-3">
								<HighlightOutlined />
							</div>
						</Flex>
					)}

					<Flex justify="center" align="center" gap={15}>
						<button
							onClick={startTimer}
							className={clsx(
								totalSeconds === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
								'px-6 py-1 border-white border text-white rounded text-sm up  hover:bg-[#6272A4] transition-all duration-300',
							)}
							disabled={totalSeconds === 0}
						>
							{isRunning ? t('pauseBtn') : t('startBtn')}
						</button>
						<Divider className="bg-white" type="vertical" />
						<button
							className="px-6 py-1  border-white border text-white rounded text-sm up cursor-pointer  hover:bg-[#6272A4] transition-all duration-300"
							onClick={resetTimer}
						>
							{t('resetBtn')}
						</button>
					</Flex>
				</Flex>
			)}

			{isShowTimeOut && (
				<div className="flex flex-col gap-5 justify-start items-center">
					<div style={{ fontSize: 100 }}>⏰</div>
					<div className="text-[#FFEB00]">{note.length <= 0 ? t('timeOut') : note}</div>
					<button
						className="px-6 py-1  border-white border text-white rounded text-sm up cursor-pointer  hover:bg-[#6272A4] transition-all duration-300"
						onClick={exitLogTimeOut}
					>
						{t('exitBtn')}
					</button>
				</div>
			)}
			<audio ref={audioRef} src="/bells/bellAlert.wav" preload="auto"></audio>
		</section>
	)
}
