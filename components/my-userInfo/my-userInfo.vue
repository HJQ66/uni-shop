<template>
	<view class="userInfo-container">
		<!-- 头像区域 -->
		<view class="avatar-container">
			<image :src="userInfo.avatarUrl" mode=""></image>
			<text>{{userInfo.nickName}}</text>
		</view>
		<!-- 收藏区域 -->
		<view class="collection-container">
			<view class="collection-shop">
				<text>8</text>
				<text>收藏的店铺</text>
			</view>
			<view class="collection-goods">
				<text>14</text>
				<text>收藏的商品</text>
			</view>
			<view class="attention-goods">
				<text>18</text>
				<text>关注的商品</text>
			</view>
			<view class="footPrint">
				<text>84</text>
				<text>足迹</text>
			</view>
		</view>
		<!-- 我的订单区域 -->
		<view class="myOrder-container">
			<view class="title">
				我的订单
			</view>
			<view class="pay">
				<view class="">
					<image src="../../static/my-icons/icon1.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="">
					<image src="../../static/my-icons/icon2.png" mode=""></image>
					<text>待收货</text>
				</view>
				<view class="">
					<image src="../../static/my-icons/icon3.png" mode=""></image>
					<text>退款/退货</text>
				</view>
				<view class="">
					<image src="../../static/my-icons/icon4.png" mode=""></image>
					<text>全部订单</text>
				</view>
			</view>
		</view>
		<!-- 最下面的区域 -->
		<view class="footer-cotainer">
			<view class="" @click="chooseAddress">
				<text>收货地址</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="">
				<text>联系客服</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="" @click="logout">
				<text>退出登录</text>
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"my-userInfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				userInfo:state=>state.users.userInfo
			})
		},
		methods:{
			// 退出登录
			logout(){
				uni.showModal({
					content:'是否退出登录',
					success: (res) => {
						if(res.confirm){
							//清空TOKEN
							this.$store.commit('UPDATETOKEN',"")
							// 清空收获地址
							this.$store.commit("updateAddress",{})
							//清空用户信息
							this.$store.commit('updateUserInfo',{})
						}
					}
				})
			},
			//点击联系地址
			chooseAddress(){
				uni.chooseAddress({
					success:(res)=>{
						// console.log(res);
						this.$store.commit('updateAddress',res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page,userInfo-container{
	width: 100%;
	height: 100%;
	background-color: rgb(243, 245, 247);
	.avatar-container{
		height: 400rpx;
		width: 100%;
		background-color:#d81e06 ;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width: 80px;
			height: 80px;
			border-radius: 50%;
			border:2px solid white;
			margin-bottom: 20rpx;
		}
		text{
			font-size: 16px;
			color: white;
		}
	}
	.collection-container{
		margin: -15px 10px 0 10px;
		background-color: white;
		box-shadow: 1px 1px 2px white;
		display: flex;
		justify-content: space-around;
		padding: 10px 0;
		border-radius: 2px;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14px;
		}
	}
	.myOrder-container{
		margin: 10px 10px;
		background-color:white;
		padding: 14px;
		box-shadow: 1px 1px 2px white;
		border-radius: 2px;
		.pay{
			margin-top: 20px;
			display: flex;
			justify-content: space-around;
			view{
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 80rpx;
					height: 80rpx;
				}
				font-size: 14px;
			}
		}
	}
	.footer-cotainer{
		background-color: white;
		padding: 0 15px;
		display: flex;
		margin: 0 10px;
		border-radius: 2px;
		flex-direction: column;
		view{
			display: flex;
			justify-content: space-between;
			padding: 15px 0;
			border-bottom: 1px solid #efefef;
		}
	}
}
</style>