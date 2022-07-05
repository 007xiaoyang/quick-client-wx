
export default {
	state: {
		themeColor: 'blue',
		userToken:  uni.getStorageSync('userToken') || '',
		userInfo: {
			userId: '',
			shopId: '',
			openId: '',
			phone: '',
			name: '',
			portrait: ''
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
		
		
	},
	actions: {
		// 默认进入小程序注册信息
		register({state}, data) {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: "weixin",
						success: (res) => {
							uni.$http.get('/wx/register', { code: res.code , shopId: data.shopId }, { load: false }).then(userId => {
								resolve(userId)
							}).catch(() => {})
						}
					});
				});
			},
			// 授权登录
			authLogin({commit,dispatch}, data) {
				return new Promise(async (resolve, reject) => {
					await uni.$http.post('/wx/authLogin', data).then(res => {
						uni.setStorageSync('userToken', data.openId);
						commit('setStateAttr', { key: 'userToken', val: data.openId});
					}).catch(() => {})
					await dispatch('getUserInfo', data.userId);
					resolve();
				});
			},
			// 获取用户信息
			getUserInfo({commit,state}, userId) {
				return new Promise((resolve, reject) => {
					uni.$http.get('/wx/getUserInfo', { userId: userId }, { load: false }).then(res => {
						console.log(res)
						commit('setStateAttr', { key: 'userInfo', val: res});
						resolve(res)
					}).catch(() => {})
				})
			},
			// 更新用户信息
			modifyUser({commit,state}, data) {
				return new Promise((resolve, reject) => {
					uni.$http.post('/wx/modifyUser', data, { load: false }).then(res => {
						const info = Object.assign(state.userInfo, data);
						commit('setStateAttr', { key: 'userInfo', val: info });
						resolve(res)
					}).catch(() => {})
				})
			},
			
			
	}
}
