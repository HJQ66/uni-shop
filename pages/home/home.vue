<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search">
			<my-search @click="goSearch"></my-search>
		</view>
	<!-- 首页轮播图 -->
		<swiper class="swiper" indicator-dots autoplay indicator-color="white" indicator-active-color="grey">
			<swiper-item v-for="(swiper,index) in swiperList" :key="swiper.goods_id" class="swiper-item" @click="goGoodDetail(swiper)">
				<image :src="swiper.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		
		<!-- 导航栏菜单 -->
		<view class="cateitems">
			<view class="cateImg" v-for="(cateitem,index) in cateitems" :key="index" @click="goCateItem(cateitem)">
				<image :src="cateitem.image_src" mode=""></image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor">
			<view class="floor-item" v-for="(floordata,index) in floordatas" :key="index">
				<view class="title">
					<image :src="floordata.floor_title.image_src" ></image>
				</view>
				<view class="img-box">
					<navigator class="img-left-box" :url="floordata.product_list[0].url">
						<image :src="floordata.product_list[0].image_src" :style="{width:floordata.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="img-right-box">
						<navigator class="img-right-box-item" :url="product.url" v-for="(product,index) in floordata.product_list" :key="index" v-if="index!==0">
							<image :src="product.image_src" :style="{width:product.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//存储轮播图
				swiperList:[],
				//导航菜单数据
				cateitems:[],
				//楼层数据
				floordatas:[]
			};
		},
		mounted(){
			//获取轮播图数据
			this.getSwiperList()
			//获取导航栏菜单数据
			this.getCateItems()
			//获取楼层数据
			this.getFloorData()
		},
		methods:{
			//获取轮播图数据
			async getSwiperList(){
				let result = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(result);
				//如果请求失败
				if(result.data.meta.status != 200){
					uni.$showErrMsg()
				}
				this.swiperList = result.data.message
			},
			
			//获取导航菜单数据
			async getCateItems(){
				let result = await uni.$http.get('/api/public/v1/home/catitems')
				// console.log(result);
				if(result.data.meta.status ==200){
					this.cateitems = result.data.message
				}else{
					uni.$showErrMsg()
				}
			},
			
			//点击轮播图跳转到商品详情
			goGoodDetail(swiper){
				uni.navigateTo({
					url:`/subpkg/good_detail/good_detail?goods_id=${swiper.goods_id}`
				})
			},
			//跳转到导航栏页面
			goCateItem(cateitem){
				if(cateitem.name=='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			
			//获取楼层数据
			async getFloorData(){
				let result = await uni.$http.get('/api/public/v1/home/floordata')
				// console.log(result);
				if(result.data.meta.status==200){
					result.data.message.forEach((item)=>{
						item.product_list.forEach((prod)=>{
							prod.url = `/subpkg/good_list/good_list?${prod.navigator_url.split('?')[1]}`
						})
					})
					//数据获取成功
					this.floordatas = result.data.message
				}else{
					uni.$showErrMsg()
				}
			},
			//点击搜索框,进入搜索页面
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.swiper{
		width: 100%;
		.swiper-item,image{
			width: 100%;
			height:100%;
		}
	}
	.cateitems{
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		.cateImg,image{
			width: 60px;
			height: 60px;
		}
	}
	.floor{
		width: 100%;
		margin-top: 20px;
		.floor-item{
			margin-top: 10px;
			.title{
				image{
					height: 30px;
					width: 100%;
				}
			}
			.img-box{
				display: flex;
				.img-left-box{
					margin-left: 10rpx;
				}
				.img-right-box{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>
