let token = uni.getStorageSync('token') || '';

export default {
	state: {

		tabarlist: [{
				iconSize: 36,
				path: '/pages/index/index',
				icon: '/static/home.png',
				noIcon: '/static/home-grey.png',
				value: '首页',

			},
			{
				iconSize: 36,
				path: '/pages/index/model',
				icon: '/static/model.png',
				noIcon: '/static/model-grey.png',
				value: '模板',

			},
			{
				iconSize: 36,
				path: '/pages/index/user',
				icon: '/static/user.png',
				noIcon: '/static/user-grey.png',
				value: '个人',

			},
			{
				iconSize: 36,
				path: '/pages/index/feedback',
				icon: '/static/feedback.png',
				noIcon: '/static/feedback-grey.png',
				value: '反馈',

			}
		],
		token: token,
		user: null
	},

	getters: {},
	mutations: {
		login(state, token) {
			state.token = token;
			if (token) {
				uni.setStorageSync('token', token);
			} else {
				uni.removeStorageSync('token');
			}
		},
		setUserInfo(state, user = null) {
			state.user = user;
		}
	},
	actions: {

	}
}
