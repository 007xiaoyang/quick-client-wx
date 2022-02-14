<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
