<template>
    <div>
   <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in reList" :key="obj.id">
        <van-image width="3rem" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <div>
      <p class="title">最新音乐</p>
      <SongItem v-for="obj in newList" 
      :key = "obj.id"
      :name = "obj.name"
      :author = "obj.song.artists[0].name"
      :id = "obj.id"
      ></SongItem>
    </div>
  </div>
</template>
<script>
import { Col, Row, Image as VanImage, Cell, CellGroup, Icon} from 'vant';
import { recommendMusicAPI } from '@/api';
import { newMusicAPI } from '@/api'
import SongItem from '@/components/SongItem'

export default {
  components:{
    [Col.name]: Col,
    [Row.name]: Row,
    [VanImage.name]: VanImage,
    [Cell.name]:Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    SongItem
  },
  data(){
    return {
      reList: [],
      newList: []
    }
  },
  async created (){
    const res = await recommendMusicAPI({
      limit : 6,
    });
    this.reList = res.data.result;

    const res2 = await newMusicAPI({
      limit : 10,
    });
    this.newList = res2.data.result;

  },
}
</script>
<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
