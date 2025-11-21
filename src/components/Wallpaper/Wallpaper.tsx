import { useEffect } from 'react'
import { RootState } from 'stores'
import { useAppSelector } from 'helpers/redux'
import { setLocalStorage } from 'utils/localStorage'
import { WallpaperStateType } from 'models/general'

export const Wallpaper = () => {
	const { path, type, fallback } = useAppSelector((store: RootState) => store.general.wallpaper)

	useEffect(() => {
		setLocalStorage<WallpaperStateType>('wallpaper', { type, path, fallback })
	}, [path, fallback, type])

	return (
		<section id='wallpaper-app' className="w-full h-full absolute top-0 left-0 z-[-1]">
			{(type === 'static' || type === 'custom') && (
				<img
					style={{ transition: 'all 0.5s linear' }}
					src={path}
					alt="static wallpaper"
					className={`object-cover object-center w-full h-full brightness-[50%]`}
					onContextMenu={(e) => e.preventDefault()}
				/>
			)}

			{type === 'live' && (
				<video
					key={path}
					loop
					muted
					autoPlay
					className="object-cover object-center w-full h-full brightness-[50%]"
					poster={fallback}
					onContextMenu={(e) => e.preventDefault()}
				>
					<source src={path} type="video/mp4" />
				</video>
			)}
		</section>
	)
}
