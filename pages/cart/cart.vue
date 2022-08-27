<template>
	<view v-if="cartInfo.length" class="cart-container">
		<!-- 收获地址组件 -->
		<my-address></my-address>
		<!-- 购物车标题组件 -->
		<view class="shop-title">
			<uni-icons type="shop" size="24"></uni-icons>
			<text class="txt-shop">购物车</text>
		</view>
		<!-- 购物车每一项商品数据 -->
		<uni-swipe-action>
			<block v-for="(cart,index) in cartInfo" :key="cart.goods_id">
			
			<uni-swipe-action-item :right-options="delObj" @click="delGoods(cart)">
				<!-- 自定义组件购物车数据列表 -->
				<my-goods :good="cart" :good_state="true" @radioChange="radioChange" @changeGoodCount="changeGoodCount"	:showNumber="true"></my-goods>
			</uni-swipe-action-item>
			
			</block>
		</uni-swipe-action>
		
		<!-- 结算 -->
		<my-settle :checkCount="checkCount"></my-settle>
	</view>
	<!-- 购物车为空时候的页面 -->
	<view class="emptyCart" v-else>
		<image src="../../static/emptyCart.png" mode=""></image>
		<view style="margin:10px 0;">
			<text>还是空的，去挑选喜欢的商品~</text>
		</view>
		<view class="">
			<button type="primary" size="mini" @click="btnGoHome">去看看</button>
		</view>
	</view>
</template>

<script>
	import tabbarBadge from '@/minxins/tabbar-badge.js'

	import {mapState,mapGetters} from 'vuex'
	export default {
		//混入 设置购物车右上角的小图标
		mixins: [tabbarBadge],
		data() {
			return {
				delObj: [{
					text: '删除',
					style: {
						backgroundColor: '#d81e06'
					}
				}]
			};
		},
		computed: {
			// 商品的信息
			...mapState({
				cartInfo: state => state.cart.cartInfo
			}),
			// 已经选中的商品的数量
			...mapGetters(['checkCount'])
		},
		methods: {
			//自定义事件，点击单选框，改变状态
			radioChange(good) {
				// 接收自定义事件传过来的参数
				// console.log(good);
				//触发commit,修改store中的数据
				this.$store.commit('updateCheckState', good)
			},
			//自定义事件，修改购物车商品数量
			changeGoodCount(good) {
				// console.log(good);
				//触发commit,修改store中每个商品的数量
				this.$store.commit('updateGoodCount', good)
			},
			//滑动商品点击删除事件
			delGoods(good){
				//消息确认框，确认是否删除该商品
				uni.showModal({
					title:"提示",
					content:"是否将该商品移出购物车",
					success:(res)=>{
						if(res.confirm){
							// console.log("删除");
							this.$store.commit('delCartGoods',good)
						}
					}
				})
			},
			//跳转到首页
			btnGoHome(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 100rpx;
	}
	.shop-title {
		display: flex;
		align-items: center;
		margin: 40rpx 0;
		.txt-shop {
			margin-left: 15rpx;
		}
	}
	.emptyCart{
		width:200px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin:250rpx auto;
		flex-wrap: wrap;
		font-size: 14px;
		image{
			width: 150px;
			height: 100px;
		}
	}
</style>
