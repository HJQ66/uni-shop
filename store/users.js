const state = {
	//用户选择的收货地址
	address:JSON.parse(uni.getStorageSync('ADDRESS') || '{}')
}
const mutations = {
	updateAddress(state,address){
		state.address = address
		this.commit('saveAddressToStorage')
	},
	//持久化存储收获地址
	saveAddressToStorage(state){
		uni.setStorageSync('ADDRESS',JSON.stringify(state.address))
	}
}
const actions = {
	
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