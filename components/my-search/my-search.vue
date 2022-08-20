<template>
	<view class="search-container">
		<view class="search-input" @click="handlerSearch">
			<uni-icons type="search" class="icon" size="20"></uni-icons>
			<text class="text">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			//触发自定义组件的自定义事件click
			handlerSearch(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-container{
		// position: fixed;
		width: 100%;
		height: 50px;
		background-color: #d81e06;
		display: flex;
		align-items: center;
		.search-input{
			width: 88%;
			margin: 0 auto;
			height: 36px;
			background-color: white;
			border-radius: 18px;
			text-align: center;
			line-height: 36px;
			.icon{
				margin-right: 4px;
			}
			.text{
				font-size: 16px;
			}
		}
	}
</style>