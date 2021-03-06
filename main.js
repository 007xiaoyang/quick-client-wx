import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import tmVuetify from "./tm-vuetify";
Vue.use(tmVuetify)


import $http from '@/uni_modules/zhouWei-request/js_sdk/requestConfig';
uni.$http = $http
Vue.prototype.$http = $http

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
