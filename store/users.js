const state = {
	//用户选择的收货地址
	address:JSON.parse(uni.getStorageSync('ADDRESS') || '{}'),
	//用户信息
	userInfo:JSON.parse(uni.getStorageSync('USERINFO') || '{}'),
	token:uni.getStorageSync('TOKEN'),
	redirectUrl:null
}
const mutations = {
	updateAddress(state,address){
		state.address = address
		this.commit('saveAddressToStorage')
	},
	//持久化存储收获地址
	saveAddressToStorage(state){
		uni.setStorageSync('ADDRESS',JSON.stringify(state.address))
	},
	//修改用户信息
	updateUserInfo(state,userInfo){
		state.userInfo = userInfo
		//持久化存储用户信息
		uni.setStorageSync('USERINFO',JSON.stringify(userInfo))
	},
	//存储token
	UPDATETOKEN(state,token){
		state.token = token
		uni.setStorageSync('TOKEN',token)
	},
	updateUrl(state,url){
		state.redirectUrl = url
	}
}
const actions = {
	async getToken(context,tokenInfo){
		//这个登录获取token的接口挂了，需要自己写死一个token
		let result = await uni.$http.post('/api/public/v1/users/wxlogin',tokenInfo)
		// console.log(result);
		if(result.data.meta.status == 400 || result.data.meta.status == 200){
			//自己随便写一个token
			context.commit('UPDATETOKEN',tokenInfo.encryptedData)
		}else{
			throw Error("登录失败")
		}
	}
}
const getters = {
	// 收获地址
	addStr(state){
		const {address} = state
		return address.provinceName+address.cityName+address.countyName+address.detailInfo
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}