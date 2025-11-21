import { SongType } from 'models/general'

const SONG_LIST: SongType[] = [
	{
		title: 'Again & Again',
		path: `song/Again & Again.mp3`,
	},
	{
		title: 'Aviscerall',
		path: `song/aviscerall - sanctuary.mp3`,
	},
	{
		title: 'Calm Garden',
		path: `song/Calm Garden - Relaxing and Peaceful.mp3`,
	},
	{
		title: 'Green Piccolo',
		path: 'song/GREEN PICCOLO - witchcraft.mp3',
	},
	{
		title: 'Lakey Inspired',
		path: `/song/LAKEY INSPIRED - Better Days.mp3`,
	},
	{
		title: `Howl's Moving Castle`,
		path: `/song/Howl's Moving Castle.mp3`,
	},
] as const

export default SONG_LIST
