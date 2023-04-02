<template>
    <div>
        <div class="main">
            <van-nav-bar :title="activeTitle" fixed/>
      <!-- 二级路由-挂载点 -->
      <router-view></router-view>
    </div>
    <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/layout/search">搜索</van-tabbar-item>
    </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, NavBar  } from 'vant';
export default {
    
    data(){
        return {
            activeTitle:this.$route.meta.title,// "默认"顶部导航要显示的标题 (默认获取当前路由对象里的meta中title值)
        }
    },
    // 路由切换 - 侦听$route对象改变
    watch: {
        $route() {
        this.activeTitle = this.$route.meta.title; // 提取切换后路由信息对象里的title显示
        },
    },
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem,
        [NavBar.name]: NavBar

    }
}
</script>
<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
