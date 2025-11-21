import {
    CheckCircleFilled,
    PauseCircleOutlined,
    PlayCircleOutlined,
    RetweetOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import { Badge, Divider, Popover } from 'antd'
import SONG_LIST from 'assets/staticData/songList'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

export const BgMusic = () => {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [repeatCurrent, setRepeatCurrent] = useState<boolean>(false)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const isPlayingRef = useRef<boolean>(isPlaying)
    const currentSong = SONG_LIST[currentIndex]

    const handleSelectSong = (index: number) => {
        if (index === currentIndex) return
        setCurrentIndex(index)
        setIsPlaying(true)
    }

    const togglePlay = () => {
        setIsPlaying((prev) => !prev)
    }

    const toggleRepeat = () => {
        setRepeatCurrent((prev) => !prev)
    }

    const handleEnded = () => {
        const audio = audioRef.current
        if (!audio) return

        if (repeatCurrent) {
            audio.currentTime = 0
            audio.play()
        } else {
            handleNext()
        }
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % SONG_LIST.length)
        setIsPlaying(true)
    }

    // update isPlayingRef
    useEffect(() => {
        isPlayingRef.current = isPlaying
    }, [isPlaying])

    // Auto play on song change
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.load()
        if (isPlayingRef.current) {
            audio.play()
        }
    }, [currentIndex])

    // control audio
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [isPlaying])

    return (
        <section id="music-player">
            <audio ref={audioRef} onEnded={handleEnded}>
                <source src={currentSong.path} type="audio/mpeg" />
            </audio>

            <div className="flex justify-end items-center gap-5">
                <div className="glowingText capitalize cursor-default">{currentSong.title}</div>
                <button title="Song List">
                    <Popover
                        trigger="click"
                        placement="topRight"
                        color="rgba(68, 71, 90, 0.9)"
                        content={
                            <div className="flex flex-col justify-between items-start">
                                <div className="flex flex-col gap-2 items-start justify-start">
                                    {SONG_LIST.map((item, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className={clsx(
                                                    'capitalize',
                                                    currentSong.title === item.title
                                                        ? 'text-white cursor-default'
                                                        : 'text-black hover:text-[#00FFD1] cursor-pointer ',
                                                )}
                                                onClick={() => handleSelectSong(index)}
                                            >
                                                {index + 1}. {item.title}
                                            </span>
                                        )
                                    })}
                                </div>
                                <Divider className="!my-3.5" />
                                <div className="flex items-center justify-around w-full">
                                    <button onClick={togglePlay} className="cursor-pointer">
                                        {isPlaying ? (
                                            <PauseCircleOutlined
                                                className="glowingIcon"
                                                style={{ fontSize: 20 }}
                                            />
                                        ) : (
                                            <PlayCircleOutlined
                                                className="glowingIcon"
                                                style={{ fontSize: 20 }}
                                            />
                                        )}
                                    </button>
                                    <button onClick={toggleRepeat} className="cursor-pointer">
                                        {repeatCurrent ? (
                                            <Badge
                                                count={
                                                    <CheckCircleFilled
                                                        style={{ color: '#F5F0E3' }}
                                                    />
                                                }
                                                size="small"
                                            >
                                                <RetweetOutlined
                                                    className="glowingIcon"
                                                    style={{ fontSize: 20 }}
                                                />
                                            </Badge>
                                        ) : (
                                            <RetweetOutlined
                                                className="glowingIcon"
                                                style={{ fontSize: 20 }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <UnorderedListOutlined className="glowingIcon" style={{ fontSize: 25 }} />
                    </Popover>
                </button>
            </div>
        </section>
    )
}
