<template>
	<view>
		<view class="no-login-container">
			<image src="../../static/no-login.png" mode=""></image>
			<button @click="btnLogin">一键登录</button>
			<text>登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				//获取token需要携带的数据(后端接口指定需要的数据)
				getTokenInfo:{
					encryptedData:'',
					rawData:'',
					iv:'',
					signature:'',
					code:''
				}
			};
		},
		computed:{
			...mapState({
				redirectUrl:state=>state.users.redirectUrl
			})
		},
		methods:{
			//点击登录按钮
			btnLogin(){
				uni.login({
					success: (res) => {
						this.getTokenInfo.code = res.code
					}
				})
				uni.getUserProfile({
					desc:'登录授权',
					fail: () => {
						uni.$showErrMsg('请重新授权！')
					},
					success: (res) => {
						// console.log(res);
						//整理需要携带的数据
						this.getTokenInfo.encryptedData = res.encryptedData
						this.getTokenInfo.rawData = res.rawData
						this.getTokenInfo.iv = res.iv
						this.getTokenInfo.signature = res.signature
						this.$store.commit('updateUserInfo',res.userInfo)
						// 存储token
						this.$store.dispatch('getToken',this.getTokenInfo)
							
					},
					complete: () => {	
						//登录成功后，如果是从购物车页面过来的，重定向到购物车页面
						if(this.redirectUrl){
							uni.switchTab({
								url:this.redirectUrl
							})
						}
						this.$store.commit('updateUrl',null)
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
.no-login-container{
	// width: 600rpx;
	flex-wrap: wrap;
	margin: 100px auto;
	display: flex;
	justify-content: center;
	image{
		width: 100px;
		height: 100px;
	}
	button{
		width: 600rpx;
		background-color:#d81e06;
		border-radius: 30px;
		color: white;
		margin: 40rpx 0;
	}
	text{
		font-size: 12px;
		color: grey;
	}
}
</style>