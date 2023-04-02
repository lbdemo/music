// api里的所有请求模块统一由index.js向外导出
import { recommendMusic, newMusic } from './Home'
import { hotSearch, searchResult } from './Search'
import { getSongById,getLyricById} from './Play'
export const recommendMusicAPI = recommendMusic //导出请求推荐歌单的方法
export const newMusicAPI = newMusic  //导出最新歌单的方法
export const hotSearchAPI = hotSearch  //导出热搜关键词的方法
export const searchResultAPI = searchResult //导出搜索结果的方法
export const getSongByIdAPI = getSongById //导出歌曲播放地址的方法
export const getLyricByIdAPI = getLyricById //导出歌曲歌词的方法