export interface YoutubeSrcType {
    id: string,
    title: string,
    url: string
    isActivated: boolean
}
export interface YoutubeAppState {
    activatedVideo: string,
    youtubeList: Array<YoutubeSrcType>
}
export const defaultDataYoutubeSrc: YoutubeAppState = {
    activatedVideo: "",
    youtubeList: []
}