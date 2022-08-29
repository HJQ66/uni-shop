<template>
	<view>
		<!-- 用户登录组件 -->
		<my-login v-if="!token"></my-login>
		
		<!-- 用户信息组件 -->
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import tabbarBadge from '@/minxins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		//混入 设置购物车右上角的小图标
		mixins:[tabbarBadge],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				token:state=>state.users.token
			})
		}
	}
</script>

<style lang="scss">

</style>
