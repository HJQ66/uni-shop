import Vue from 'vue'
import Vuex from 'vuex'

import cart from '@/store/cart.js'
import users from '@/store/users.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		cart,
		users
	}
})

export default store