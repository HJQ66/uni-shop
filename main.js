import App from './App'
import {$http} from '@escook/request-miniprogram'
uni.$http = $http

//引入store
import store from '@/store/index.js'

//配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
//请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中',
		icon:'none'
	})
	
}
//响应拦截器
$http.afterRequest=function(){
	uni.hideLoading()
}

//定义全局请求失败的方法
uni.$showErrMsg = function(title="请求数据失败！",duration=1500){
	uni.showToast({
		title:title,
		icon:'none',
		//消息弹框自动关闭的时间
		duration:duration
	})
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif