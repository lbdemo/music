<template>
    <div>
      <van-search v-model="value" placeholder="请输入搜索关键词" 
      shape="round" @input="inputFn">
      </van-search>
      <div>
        <!-- 搜索容器 -->
        <div class="search_wrap"  v-if="resultList.length === 0">
          <!-- 标题 -->
          <div class="hot_title">热门搜索</div>
          <!-- 热搜关键词容器 -->
          <div class="hot_name_wrap">
            <!-- 热搜关键词 -->
            <span class="hot_item" 
            v-for="(obj,index) in hotList" :key="index"
            @click="search(obj.first)">
            {{ obj.first }}
            </span>
          </div>
          </div>
          <!-- 搜索结果容器 -->
          <div v-else>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          ><SongItem v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id">
          </SongItem>
            
            </van-list>
          </div>
        </div>
        </div>
</template>
<script>
import {Search,Cell, CellGroup,List,} from 'vant'
import {hotSearchAPI, searchResultAPI} from '@/api'
import SongItem from "@/components/SongItem";
export default {
  async created() {
    const res = await hotSearchAPI();
    this.hotList = res.data.result.hots
  },
  
  components: {
    [Search .name]: Search,
    [Cell.name]:Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    SongItem
  },
  data(){
    return{
      value : '',
      hotList : [],//热搜关键词
      resultList: [], //搜索结果
      loading: false, //
      finished: false, //未加载全部（如果设置为true，底部就不会再执行onload）
      page: 1,//当前加载页码
      timer: null, //防抖定时器
    }
  },
  methods: {
    async search(val){
      //点击热搜关键词
      this.page = 1;
      this.finished = false; //点击新关键词，才能有数据
      this.value = val;
      const res = await this.getListFn();
      this.resultList = res.data.result.songs;
      this.loading = false; //本次数据加载完毕，才能让list显示更多
    },
    async getListFn() {
    return await searchResultAPI({
      keywords: this.value,
      limit: 20,
      offset: (this.page-1)*20
    })
  },
  async inputFn(){
    // 目标: 输入框改变-逻辑代码-慢点执行
    // 解决: 防抖
    if(this.timer) 
    clearTimeout(this.timer)
    this.timer = setTimeout(async()=>{
      this.page = 1;
      this.finished = false // 输入框关键字改变-可能有新数据(不一定加载完成了)
    if(this.value.length==0){
      this.resultList = [];
      return
      // 搜索关键词如果没有, 就把搜索结果清空阻止网络请求发送(提前return)
    }
    const res = await this.getListFn();
    // 如果搜索结果响应数据没有songs字段-无数据
    if (res.data.result.songs === undefined) {
        this.resultList = [];
        return;
    }
    this.resultList = res.data.result.songs;
    this.loading = false;
    },500)
    
  },
  async onLoad(){
    // 触底事件(要加载下一页的数据咯), 内部会自动把loading改为true
    this.page++;
    const res = await this.getListFn();
    if (res.data.result.songs === undefined) { // 没有更多数据了
          this.finished = true; // 全部加载完成(list不会在触发onload方法)
          this.loading = false; // 本次加载完成
         return;
       }
    this.resultList = [...this.resultList,...res.data.result.songs]
    this.loading = false //数据加载完毕，保证下次还能触发onload
  }
  }
}
</script>
<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
