<script>
	export default {
		onLaunch: async function(option) {
			// 微信登录
			if (option.query && option.query.shopId) {
				uni.$tm.vx.commit('user/setStateAttr', {
					key: 'themeColor',
					val: option.query.themeColor || 'blue'
				});
				const userId = await uni.$tm.vx.actions('user/register', option.query);
				uni.$tm.vx.actions('user/getUserInfo', userId);
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./tm-vuetify/mian.min.css";
	/* 主题包 */
	@import "./tm-vuetify/scss/theme.css";

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
