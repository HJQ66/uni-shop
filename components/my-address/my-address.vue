<template>
	<view>
		<!-- 添加收货地址的按钮 -->
		<view class="add-address" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" @click="addAddress">请选择收获地址 +</button>
		</view>
		<!-- 收货地址信息 -->
		<view class="address-info" v-else @click="addAddress">
			<view class="row1">
				<text>收货人：{{address.userName}}</text>
				<view class="phone">
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="right" size="20" class="phone-right"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<text>收货地址：{{addStr}}</text>
			</view>
		</view>
		<!-- 底部分割线 -->
		<view class="address-bottom">
			<img src="../../static/cart_border@2x.png" alt="">
		</view>
	</view>
</template>

<script>
	import { mapState,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				//详细收获地址
				address:state=>state.users.address
			}),
			...mapGetters(['addStr'])
		},
		methods:{
			//点击选择收入地址按钮
			async addAddress(){
				//调用uni的API 选择收获地址（用真机调试）
				uni.chooseAddress({
					success:(res)=>{
						this.$store.commit('updateAddress',res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.add-address{
		width: 40%;
		margin:30px auto;
	}
	.address-bottom img{
		width: 100%;
		height: 10rpx;
	}
	.address-info{
		font-size: 14px;
		.row1{
			display: flex;
			justify-content: space-between;
			margin: 40rpx 10rpx;
			align-items: center;
			.phone-right{
				margin-left: 10rpx;
			}
		}
		.row2{
			margin: 40rpx 10rpx;
		}
	}
</style>