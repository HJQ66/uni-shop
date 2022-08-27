<template>
	<view class="settle-container">
		<label class="radio"  @click="changeRadio">
			<radio :checked="isFullChecked" color="#d81e06"/><text>全选</text>
		</label>
		<view class="totalPrice">
			<text>合计：<text style="color: #d81e06;font-weight: bold;">￥{{allCheckPrice}}</text></text>
		</view>
		<view class="btnSettle">
			<button>结算({{checkCount}})</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	export default {
		name:"my-settle",
		props:['checkCount'],
		data() {
			return {
				
			};
		},
		computed: {
			//total:购物车中的总数量
			//allCheckPrice:购物车中已经选中的商品的总价格
			...mapGetters(['total','allCheckPrice']),
			// 判断全选按钮的状态
			isFullChecked(){
				return this.total===this.checkCount
			},
		},
		methods: {
			changeRadio() {
				this.$store.commit('updateAllgoodState',!this.isFullChecked)
			}
		},
	}
</script>

<style lang="scss">
.settle-container{
	height: 100rpx;
	background-color: white;
	position: fixed;
	width: 100%;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10rpx;
	font-size: 15px;
	.btnSettle{
		button{
			width: 100px;
			border: none;
			background-color: #d81e06;
			color: white;
			border-radius: 0;
			height: 100rpx;
			text-align: center;
			font-size: 15px;
			line-height: 100rpx;
		}
	}
}
</style>