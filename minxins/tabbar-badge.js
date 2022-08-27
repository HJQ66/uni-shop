import {mapGetters} from 'vuex'
export default {
	//当页面显示时会加载
	onShow() {
		this.setCartBadge()
	},
	computed: {
		...mapGetters(['total'])
	},
	watch:{
		total(){
			this.setCartBadge()
		}
	},
	methods: {
		// 为 tabBar 购物车项的右上角添加文本。
		setCartBadge() {
			uni.setTabBarBadge({
				index: 2,
				//text必须是字符串
				text: this.total + ''
			})
		}
	}
}
