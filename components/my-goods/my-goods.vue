<template>
		<view>
			<!-- 商品信息 -->
			<view class="goodlist-container" @click="goGoodDetail(good)">
				<!-- 单选框 -->
				<radio class="good-radio" v-if="good_state" @click="changeRadio(good)" :checked="good.goods_state" color="#d81e06"/>
				
				<!-- 商品左侧图片 -->
				<view class="left-good-img">
					<img class="left-img" :src="good.goods_small_logo" alt="">
				</view>
				<!-- 商品右侧详情 -->
				<view class="right-good-detail">
					<text class="good-title">{{good.goods_name}}</text>
					<view class="good-info-number">
						<text class="good-price">￥{{good.goods_price}}.00</text>
						<uni-number-box :min="1" v-if="showNumber" @change="changeGoodNumber(good,$event)" :value="good.goods_count"></uni-number-box>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			good:{
				type:Object,
			},
			good_state:{
				type:Boolean,
				default:false
			},
			showNumber:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		},
		methods:{
			goGoodDetail(good){
				//触发自定义事件click
				this.$emit('click',good)
			},
			changeRadio(good){
				good.goods_state = !good.goods_state
				// 触发自定义事件
				this.$emit('radioChange',{
					goods_id:good.goods_id,
					goods_state:good.goods_state
				})
			},
			changeGoodNumber(good,num){
				this.$emit('changeGoodCount',{
					goods_id:good.goods_id,
					goods_count:num
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodlist-container{
		border-bottom: 1px solid #efefef;
		display: flex;
		margin-bottom: 10px;
		padding: 0 5px;
		.good-radio{
			margin: auto 0;
		}
		.left-good-img{
			.left-img{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.right-good-detail{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 5px;
			.good-title{
				font-size: 14px;
			}
			.good-price{
				font-weight: bold;
				color: #d81e06;
			}
			.good-info-number{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>