let token = uni.getStorageSync('token') || '';

export default {
	state: {
		themeColor: 'blue',
		token: token,
		user: uni.getStorageSync('quickClientUser') || {
			shopId: '',
			openId: '',
			sessionKey: '',
		}
	},

	getters: {},
	mutations: {
		//更新state数据
		setStateAttr(state, param) {
			if (param instanceof Array) {
				for (let item of param) {
					state[item.key] = item.val;
				}
			} else {
				state[param.key] = param.val;
			}
		},
		
		
		login(state, shopId) {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: "weixin",
						success: (res) => {
							uni.$http.get('/wx/register', { code: res.code , shopId: shopId }, { load: false }).then(res => {
								let userData = { shopId: res.shopId, openId: res.openId, sessionKey: res.sessionKey };
								uni.setStorageSync('quickClientUser', userData);
								state.user = userData;
								resolve(userData)
							}).catch(() => {})
						}
					})
					
				});
			},
	},
	actions: {
		
	}
}
