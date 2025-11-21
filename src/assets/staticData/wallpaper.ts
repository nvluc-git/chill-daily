import { BgLiveSrc } from 'models/general'

export const LIVE_BG_SRC: BgLiveSrc[] = [
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb1.jpg',
		path: '/wallpapers/liveBg/videos/liveBg1.mp4',
	},
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb2.jpg',
		path: '/wallpapers/liveBg/videos/liveBg2.mp4',
	},
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb3.jpg',
		path: '/wallpapers/liveBg/videos/liveBg3.mp4',
	},
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb4.jpg',
		path: '/wallpapers/liveBg/videos/liveBg4.mp4',
	},
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb5.jpg',
		path: '/wallpapers/liveBg/videos/liveBg5.mp4',
	},
	{
		thumbnail: '/wallpapers/liveBg/imgs/thumb6.jpg',
		path: '/wallpapers/liveBg/videos/liveBg6.mp4',
	},
] as const

export const STATIC_BG_SRC: string[] = [
	'/wallpapers/staticBg/staticBg1.png',
	'/wallpapers/staticBg/staticBg2.jpg',
	'/wallpapers/staticBg/staticBg3.jpg',
	'/wallpapers/staticBg/staticBg4.jpg',
	'/wallpapers/staticBg/staticBg5.jpg',
	'/wallpapers/staticBg/staticBg6.png',
] as const
