let token = uni.getStorageSync('token') || '';

export default {
	state: {
		themeColor: 'blue',
		token: token,
		user: {
			avatarUrl: '',
			nickName: '',

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
		login(state, token) {
			state.token = token;
			if (token) {
				uni.setStorageSync('token', token);
			} else {
				uni.removeStorageSync('token');
			}
		}
	},
	actions: {

	}
}
