<template>
	<view>
		<!-- 搜索框 -->
		<my-search @click="goSearch"></my-search>
		<!-- 分类 -->
		<view class="scoll-view-container">
			<scroll-view class="left-scoll-view" :style="{height:wh+'px'}" scroll-y="true" >
				<view :class="['left-scoll-view-item',isActive===index ? 'active' : '']" v-for="(cate,index) in category" :key="cate.cat_id" @click="handlerCate(index)">
					{{cate.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="right-scoll-view" :scroll-top="scollTop" :style="{height:wh+'px'}" scroll-y="true" >
				<view class="right-scoll-item" v-for="(cate,index) in categoryLevel2" :key="cate.cat_id">
					<view class="right-scoll-title">/ {{cate.cat_name}} /</view>
					<view class="right-scoll-level3" >
						<view class="right-scoll-level3-item" v-for="(childCate,index) in cate.children" :key="childCate.cat_id">
							<image :src="childCate.cat_icon.replace('dev','web')" @click="goGoodList(childCate)"></image>
							<text>{{childCate.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				//当前外界设备的可使用窗口高度
				wh:0,
				//商品分类
				category:[],
				//存储isActive的索引
				isActive:0,
				//存储二级分类
				categoryLevel2:[],
				scollTop:0
			};
		},
		mounted() {
			// 获取设备信息
			this.getSysInfo()
			//获取商品分类
			this.getCategotyList()
		},
		methods:{
			//获取设备信息
			async getSysInfo(){
				let info = await uni.getSystemInfo()
				// console.log(info);
				this.wh = info[1].windowHeight-50
			},
			//获取商品分类信息
			async getCategotyList(){
				let result = await uni.$http.get('/api/public/v1/categories')
				console.log(result);
				if(result.data.meta.status == 200){
					this.category = result.data.message
					
					//默认时展示第一个一级分类的数据
					this.categoryLevel2 = result.data.message[0].children
				}
			},
			//当点击左边分类菜单时
			handlerCate(index){
				this.isActive = index
				//当改变左边分类菜单时，给右边二级菜单重新赋值
				this.categoryLevel2 = this.category[index].children
				//当切换左侧菜单时让每次的scoll-top值为0
				this.scollTop = this.scollTop==0 ? 1 : 0
			},
			//点击图片跳转到商品列表
			goGoodList(childCate){
				uni.navigateTo({
					url:`/subpkg/good_list/good_list?cid=${childCate.cat_id}`
				})
			},
			//点击分类页面的搜索框
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scoll-view-container{
	display: flex;
	.left-scoll-view{
		width: 120px;
		.left-scoll-view-item{
			text-align: center;
			line-height: 100rpx;
			background-color: #f4f4f4;
			font-size: 12px;
			&.active{
				background-color: white;
				position: relative;
				&::before{
					content: "";
					display: block;
					width: 3px;
					height: 50rpx;
					background-color:red;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.right-scoll-view{
		.right-scoll-item{
			.right-scoll-title{
				text-align: center;
				font-weight: bold;
				font-size: 14px;
				margin: 10px 0;
			}
			.right-scoll-level3{
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				.right-scoll-level3-item{
					margin-top: 5px;
					display: flex;
					flex-direction: column;
					width: 33.33%;
					align-items: center;
					image{
						width: 60px;
						height: 60px;
					}
					text{
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
