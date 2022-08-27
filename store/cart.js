const state = {
	// 购物车数组，用来存储每个商品的信息对象
	// 每个商品的信息对象，都包含如下6个属性
	// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
	cartInfo:JSON.parse(uni.getStorageSync('CartInfo') || '[]')
}
const mutations = {
	addCartInfo(state,good){
		//如果购物车有该商品，则将购物车里面的该商品数量加1，否则将该商品添加的购物车
		let findResult = state.cartInfo.find(item=>{
			return good.goods_id==item.goods_id
		})
		// console.log(findResult);
		if(findResult){
			findResult.goods_count++
		}else{
			state.cartInfo.push(good)
		}
		// console.log(this);
		//持久化存储
		this.commit('saveCartInfo')
	},
	//持久化存储购物车信息
	saveCartInfo(state){
		uni.setStorageSync('CartInfo',JSON.stringify(state.cartInfo))
	},
	//修改购物车中勾选状态
	updateCheckState(state,goods){
		//首先找到当前被选中的id
		let findResult = state.cartInfo.find(item=>{
			return goods.goods_id==item.goods_id
		})
		//修改购物车中的状态
		if(findResult){
			findResult.goods_state = goods.goods_state
		}
		this.commit('saveCartInfo')
	},
	//修改购物车商品数量
	updateGoodCount(state,good){
		let findResult = state.cartInfo.find(item=>item.goods_id==good.goods_id)
		if(findResult) findResult.goods_count = good.goods_count
		this.commit('saveCartInfo')
	},
	//删除购物车中的商品
	delCartGoods(state,good){
		state.cartInfo = state.cartInfo.filter(item=>item.goods_id!=good.goods_id)
		this.commit('saveCartInfo')
	},
	//点击全选按钮
	updateAllgoodState(state,isChecked){
		state.cartInfo.forEach(item=>{
			item.goods_state = isChecked
		})
		this.commit('saveCartInfo')
	}
}
const actions = {
	
}
const getters = {
	//计算购物车商品总数量
	total(state){
		let count = 0
		state.cartInfo.forEach(item=>{
			count += item.goods_count
		})
		return count
	},
	//计算购物车中选中的商品数量
	checkCount(state){
		//过滤出已经选中的商品
		//将已经选中的商品的数量进行累加求和
		let count = state.cartInfo.reduce((total,item)=>{
			if(item.goods_state){
				total += item.goods_count
			}
			return total
		},0)
		return count
	},
	//计算购物车中已经勾选的商品的总价格
	allCheckPrice(state){
		return state.cartInfo.reduce((total,item)=>{
			if(item.goods_state){
				total += item.goods_count*item.goods_price
			}
			return total
		},0)
	}
}
export default{
	state,
	mutations,
	actions,
	getters
}