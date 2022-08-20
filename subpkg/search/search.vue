<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-input">
			<uni-search-bar :focus="true" cancelButton="none" :radius="20" @input="changeInput"></uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="search-advice" v-if="keyWord!=''">
			<view class="search-advice-item" v-for="(search,index) in searchAdvice" :key="search.goods_id">
				<text class="search-name">{{search.goods_name}}</text>
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-container" v-else>
			<view class="search-history">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="removeSearch"></uni-icons>
			</view>
			<view class="search-items">
				<view class="tag-item" @click="goGoodList(tag)" v-for="(tag,index) in historySearch" :key="index">
					{{tag}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				//搜索关键词
				keyWord:'',
				//搜索建议数据
				searchAdvice:[],
				//搜索历史
				historySearch:[]
			};
		},
		mounted(){
			//获取持久化存储的历史记录
			if(uni.getStorageSync('history'))
			{
				this.historySearch =JSON.parse(uni.getStorageSync('history')) 
				// console.log(hi);
			}
		},
		methods:{
			//当输入框内容发生变化时
			changeInput(e){
				//节流
				if(this.timer!=null){
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					this.keyWord=e.trim()
					this.getSearchAdvice()
				},500)
			},
			//获取搜索建议数据
			async getSearchAdvice(){
				if(!this.keyWord){
					this.searchAdvice=[]
				}else{
					let result = await uni.$http.get(`/api/public/v1/goods/search?query=${this.keyWord}`)
					// console.log(result);
					if(result.data.meta.status == 200){
						this.searchAdvice = result.data.message.goods
						//当获取信息成功保存搜索历史
						this.saveHistorySearch()
					}else{
						uni.$showErrMsg()
					}
				}
			},
			//保存搜索历史
			saveHistorySearch(){
				//首先需要判断是否有重复的历史记录
				if(this.historySearch.indexOf(this.keyWord)==-1){
					this.historySearch.unshift(this.keyWord)
					//对搜索历史进行持久化存储
					uni.setStorageSync('history',JSON.stringify(this.historySearch))
				}else{
					//如果数组中有当前搜索记录
					let index = this.historySearch.indexOf(this.keyWord)
					//需要删除原数组中已有的搜索记录
					this.historySearch.splice(index,1)
					//然后再添加该搜索记录到最前面
					this.historySearch.unshift(this.keyWord)
					//对搜索历史进行持久化存储
					uni.setStorageSync('history',JSON.stringify(this.historySearch))
				}
			},
			//一键删除搜索历史
			removeSearch(){
				uni.removeStorageSync('history')
				this.historySearch = []
			},
			//点击搜索历史tag项，跳转到商品列表
			goGoodList(tag){
				uni.navigateTo({
					url:`/subpkg/good_list/good_list?query=${tag}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-input{
		background-color: #d81e06;
	}
	.search-advice{
		.search-advice-item{
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;
			border-bottom:1px solid #efefef ;
			padding: 0 5px;
			.search-name{
				//不允许文字换行
				white-space: nowrap;
				//将多余的隐藏
				overflow: hidden;
				//隐藏的部分用...代替
				text-overflow: ellipsis;
				font-size: 12px;
			}
		}
	}
	.history-container{
		.search-history{
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;
			margin: 0 5px;
			border-bottom:1px solid #efefef;
		}
		.search-items{
			.tag-item{
				display: inline-block;
				background-color: #efefef;
				margin: 5px;
				padding: 5px 12px;
				font-size: 12px;
				color: gray;
			}
		}
	}
</style>
