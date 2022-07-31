<script>
export default {
	async onLaunch(option) {
		// 微信登录
		var data = option.query ? option.query : { shopId: '51', themeColor: '' };
		uni.$tm.vx.commit('user/setStateAttr', {
			key: 'themeColor',
			val: data.themeColor || 'blue'
		});
		const userId = await uni.$tm.vx.actions('user/register', data);
		await uni.$tm.vx.actions('user/getUserInfo', userId);
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style>
/*每个页面公共css */
@import './tm-vuetify/mian.min.css';
/* 主题包 */
@import './tm-vuetify/scss/theme.css';

page {
	height: 100%;
}

.hidden {
	overflow: hidden;
}

.text-overflow {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.scroll {
	overflow: auto;
	height: 100%;
}
</style>
