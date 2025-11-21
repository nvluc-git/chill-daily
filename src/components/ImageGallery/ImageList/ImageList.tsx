import { LIVE_BG_SRC, STATIC_BG_SRC } from 'assets/staticData/wallpaper'
import { WallpaperStateType } from 'models/general'

interface RenderPhotosProps {
	handleClick: ({ path, type }: WallpaperStateType) => void
	typeImage: string
}
export const ImageList = ({ handleClick, typeImage }: RenderPhotosProps) => {
	return (
		<>
			{typeImage === 'static' &&
				STATIC_BG_SRC.map((img, index) => {
					return (
						<div
							key={index}
							style={{ backgroundImage: `url(${img})` }}
							className="rounded-lg cursor-pointer hover:border-white hover:border bg-cover bg-center w-[300px] h-[200px]"
							onClick={() =>
								handleClick({
									path: img,
									type: 'static',
									fallback: '',
								})
							}
						></div>
					)
				})}
			{typeImage === 'live' &&
				LIVE_BG_SRC.map((img, index) => (
					<div
						key={index}
						style={{ backgroundImage: `url(${img.thumbnail})` }}
						className="rounded-lg cursor-pointer hover:border-white hover:border bg-cover bg-center w-[300px] h-[200px]"
						onClick={() =>
							handleClick({
								path: img.path,
								type: 'live',
								fallback: img.thumbnail,
							})
						}
					></div>
				))}
		</>
	)
}
