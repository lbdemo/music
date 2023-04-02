import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible'//适配
import '@/styles/reset.css' //初始化样式
import router from './router'
import { List, Search , Icon, Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage,Cell, CellGroup  } from 'vant';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
Vue.use(List).use(Search).use(Icon).use(Tabbar).use(TabbarItem).use(NavBar).use(Col).use(Row).use(VanImage).use(CellGroup).use(Cell);
