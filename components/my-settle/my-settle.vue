<template>
	<view class="settle-container">
		<label class="radio"  @click="changeRadio">
			<radio :checked="isFullChecked" color="#d81e06"/><text>全选</text>
		</label>
		<view class="totalPrice">
			<text>合计：<text style="color: #d81e06;font-weight: bold;">￥{{allCheckPrice}}</text></text>
		</view>
		<view class="btnSettle" @click="settleHandler">
			<button>结算({{checkCount}})</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapState } from "vuex"
	export default {
		name:"my-settle",
		props:['checkCount'],
		data() {
			return {
				// 倒计时的时间
				seconds:3,
				timer:null
			};
		},
		computed: {
			//total:购物车中的总数量
			//allCheckPrice:购物车中已经选中的商品的总价格
			...mapGetters(['total','allCheckPrice',"addStr"]),
			// 判断全选按钮的状态
			isFullChecked(){
				return this.total===this.checkCount
			},
			//收获地址
			...mapState({
				address:state=>state.users.address,
				token:state=>state.users.token,
				cartInfo:state=>state.cart.cartInfo
			})
		},
		methods: {
			//点击全选按钮
			changeRadio() {
				this.$store.commit('updateAllgoodState',!this.isFullChecked)
			},
			//点击了结算按钮
			settleHandler(){
				//判断用户是否选择了商品
				if(!this.checkCount) return uni.$showErrMsg('请选择你需要结算的商品！')
				
				//判断用户是否选择了收获地址
				if(JSON.stringify(this.address)=='{}') return uni.$showErrMsg('请选择收获地址！')
				
				//判断用户是否登录
				if(!this.token) {
					this.loginTips(this.seconds)
					//如果用户没有登录的话，显示提示框，3秒后跳转到登录页面
					this.timer = setInterval(()=>{
						this.seconds--
						this.loginTips(this.seconds)
						if(this.seconds<=0){
							clearInterval(this.timer)
							this.seconds = 3
							uni.switchTab({
								url:'/pages/mine/mine',	
								success: () => {
									this.$store.commit('updateUrl','/pages/cart/cart')
								}
							})
						}
					},1000)
				}
				this.payOrder()
				
			},
			loginTips(n){
				uni.showToast({
					icon:"none",
					title:`您还没有登录,${n}秒后跳转到登录页面`,
					// 是否显示透明蒙层，防止触摸穿透，默认
					mask:true
				})
			},
			//创建订单
			async payOrder(){
				// 整理需要携带给服务器的参数
				const orderInfo = {
					// 订单总价格
					order_price:this.allCheckPrice,
					// 收获地址
					consignee_addr:this.addStr,
					// 订单数组:包括商品id,购买的数量,单价
					goods:this.cartInfo.filter(i=>i.goods_state).map(item=>{
						return {
							goods_id:item.goods_id,goods_number:item.goods_count,goods_price:item.goods_price
						}
					})
				}
				// 由于获取不到后端的token,所以这里也得不到订单信息
				 let res = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				 console.log(res);
				 if(res.statusCode==200){
					 uni.$showErrMsg("支付成功！")
				 }
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