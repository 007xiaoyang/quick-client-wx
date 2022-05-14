<script>
	export default {
		onLaunch: function(option) {
			console.log('App Launch', option)
			// 微信登录
			if (option.query && option.query.shopId) {
				uni.$tm.vx.commit('user/login', option.query.shopId);
			}
			console.log(uni.$tm)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
