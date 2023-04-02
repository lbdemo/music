import request from '@/utils/request'
// 首页-推荐歌单的数据
export const recommendMusic = params => request({
    url:'/personalized',
    params,// 将来外面可能传入params的值 {limit: 20}
})

// 首页-最新歌曲的数据
export const newMusic = params => request({
    url:'/personalized/newsong',
    params,// 将来外面可能传入params的值 {limit: 20}
})