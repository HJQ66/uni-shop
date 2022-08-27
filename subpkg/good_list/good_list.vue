<template>
	<view>
		<block v-for="(good,index) in goodList" :key="good.goods_id">
			<!-- 自定义组件 --> 
			<my-goods :good="good" @click="goGoodDetail"></my-goods>
		</block>
		<view class="notGood-tip" v-if="!goodList.length">
			暂无商品数据...
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//获取商品列表需要传递的参数
				goodListQuery:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				//存储商品列表总数
				total:0,
				//存储商品列表数据
				goodList:[],
				//节流阀
				isLoading:false
			};
		},
		onLoad(e) {
			this.goodListQuery.query = e.query || ""
			this.goodListQuery.cid = e.cid || ""
			this.getGoodList()
		},
		methods:{
			//获取商品列表数据
			async getGoodList(){
				//开启节流阀
				this.isLoading = true
				let result = await uni.$http.get('/api/public/v1/goods/search',this.goodListQuery)
				//关闭节流阀
				this.isLoading = false
				//请求数据完成关闭下拉刷新
				uni.stopPullDownRefresh()
				// console.log(result);
				if(result.data.meta.status==200){
					this.goodList = [...this.goodList,...result.data.message.goods]
					this.total = result.data.message.total
				}
			},
			
			// 点击页面商品到页面详情（这个是自定义事件，是在子组件里面触发该事件传参的）
			goGoodDetail(good){
				console.log(good);
				uni.navigateTo({
					url:`/subpkg/good_detail/good_detail?goods_id=${good.goods_id}`
				})
			},
		},
		
		// 页面上拉触底事件函数
		onReachBottom() {
			// 如果当前正在请求数据就不能再继续请求数据了
			if(this.isLoading) return
			
			if(this.goodListQuery.pagenum*this.goodListQuery.pagesize>=this.total) return uni.$showErrMsg("数据加载完毕！")
			
			this.goodListQuery.pagenum += 1
			//获取商品列表数据
			this.getGoodList()
		},
		//下拉刷新的回调
		onPullDownRefresh() {
			this.goodList = []
			this.goodListQuery.pagenum=1
			this.getGoodList()
		}
	}
</script>

<style lang="scss">
	.goodlist-container{
		border-bottom: 1px solid #efefef;
		display: flex;
		margin-bottom: 10px;
		padding: 0 5px;
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
		}
	}
</style>
