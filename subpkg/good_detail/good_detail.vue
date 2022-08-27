<template>
	<view>
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				:circular="true">
				<swiper-item @click="previewImg(index)" class="swiper-item" v-for="(good,index) in goodDetail.pics"
					:key="good.goods_id">
					<image class="swiper-img" :src="good.pics_big"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息区 -->
		<view class="good-info">
			<!-- 商品价格区 -->
			<view class="good-price">
				<text>￥{{goodDetail.goods_price}}.00</text>
			</view>
			<!-- 商品详情区 -->
			<view class="good-detail">
				<!-- 左侧详情区 -->
				<view class="left-good-detail">
					<text>{{goodDetail.goods_name}}</text>
				</view>
				<!-- 右侧收藏 -->
				<view class="right-collection">
					<uni-icons type="star" color="darkgray" size="25"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 商品快递区 -->
			<view class="mail">
				<text>快递：免运费</text>
			</view>
		</view>
		<!-- 商品详情区 -->
		<rich-text :nodes="goodDetail.goods_introduce"></rich-text>
		<!-- 商品加入购物车组件 -->
		<!-- @click左侧按钮点击事件，@buttonClick右侧按钮点击事件 -->
		<uni-goods-nav class="uni-goods-nav" @click="leftClick" @buttonClick="rightClick" :fill="true"
			:buttonGroup="buttonGroup" :options="options" />
	</view>
</template>

<script>
	import {
		mapState,mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				//商品id
				goods_id: '',
				//商品详情信息
				goodDetail: {},
				//商品加入购物车的配置项
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				
			};
		},
		computed: {
			// 从vuex中获取购物车信息数据
			...mapState({
				cartInfo: (state) => {
					return state.cart.cartInfo
				},
			}),
			...mapGetters(['total'])
		},
		watch:{
			//监听购物车总数量total的变化
			total:{
				//页面一开始就监听一次
				immediate:true,
				handler(newVal,oldVal){
					let findResult = this.options.find(item=>item.text=="购物车")
					if(findResult){
						findResult.info = newVal
					}
				}
			}
		},
		onLoad(e) {
			// console.log(e);
			this.goods_id = e.goods_id
			this.getGoodDetail()
		},
		methods: {
			//获取商品详情数据
			async getGoodDetail() {
				let result = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.goods_id}`)
				// console.log(result);
				if (result.data.meta.status) {
					//replace的第一个参数是一个正则表达式，正则表达式后面加一个g代表全局替换
					result.data.message.goods_introduce = result.data.message.goods_introduce.replace(/<img /g,
						"<img style='display:block'").replace(/.webp/g,'.jpg')
					this.goodDetail = result.data.message
				}
			},
			//预览图片
			previewImg(index) {
				uni.previewImage({
					//current 为当前显示图片的链接/索引值,必填
					current: index,
					//需要预览图片的图片数组
					urls: this.goodDetail.pics.map(item => item.pics_big)
				})
			},
			//左侧店铺购物车点击事件
			leftClick(e) {
				// console.log(e);
				if (e.content.text == '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			//右侧加入购物车，立即购买点击事件
			rightClick(e) {
				// console.log(e);
				if(e.content.text === "加入购物车"){
					//添加购物车需要的信息
					// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
					const {goods_id,goods_name,goods_price,goods_small_logo,goods_state} = this.goodDetail
					//整理需要添加购物车信息的数据
					const cart={
						goods_id:goods_id,
						goods_name:goods_name,
						goods_price:goods_price,
						goods_count:1,
						goods_small_logo:goods_small_logo,
						goods_state:true
					}
					//调用store中的添加购物车数据方法
					this.$store.commit('addCartInfo',cart)
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-container {
		.swiper {
			height: 750rpx;

			.swiper-item {
				.swiper-img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.good-info {
		margin-bottom: 20px;

		.good-price {
			margin: 10px 0;

			text {
				font-size: 20px;
				color: red;
			}
		}

		.good-detail {
			display: flex;

			.left-good-detail {
				width: 80%;
				font-size: 14px;
				margin: 0 10px;
			}

			.right-collection {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				border-left: 1px solid #efefef;

				text {
					color: darkgray;
					font-size: 14px;
				}
			}
		}

		.mail {
			margin-top: 10px;
			font-size: 12px;
			color: darkgray;
			margin-left: 10px;
		}
	}

	.uni-goods-nav {
		position: sticky;
		bottom: 0px;
		height: 120rpx;
		z-index: 999;
		background-color: white;
	}
</style>
