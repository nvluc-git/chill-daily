// ✅ Hàm chuyển đổi URL YouTube thành embed URL
export const convertToEmbedUrl = (url: string): string | null => {
	const match =
		url.match(
			/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})/,
		) || url.match(/(?:https?:\/\/)?youtu\.be\/([\w-]{11})/)

	return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

// ✅ Hàm kiểm tra URL YouTube hợp lệ
export const isValidYoutubeUrl = (url: string): boolean => {
	const regex =
		/^(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
	return regex.test(url)
}
