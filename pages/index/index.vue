<template>
	<view class="warps" :class="[$tm.vx.state().tmVuetify.black ? 'black' : 'grey-lighten-4']">
		<tm-menubars title=" " color="pink" :showback="false"></tm-menubars>
		
		<view class="center_warp" :style="{height: bodyHeight}">
			<home v-if="tabIndex == 0" style="height: 100%;"></home>
			<classify v-else-if="tabIndex == 1"></classify>
			<cart v-else-if="tabIndex == 3"></cart>
			<my v-else="tabIndex == 4"></my>
		</view>

		<tm-bottomnavigation class="tabbar" icon-color="pink" icon-color-grey="grey-lighten-1" :list="tabbar" 
			@change="tabBarChange"></tm-bottomnavigation>
	</view>
</template>

<script>
	import Home from './home.vue'
	import Classify from './classify.vue'
	import Cart from './cart.vue'
	import My from './my.vue'
	export default {
		components: { Home, Classify, Cart, My},
		data() {
			return {
				bodyHeight: '100%',
				tabIndex: 0,
				tabbar: [{
						icon: 'icon-position-fill',
						value: '首页',
						fontSize: 25
					},
					{
						icon: 'icon-smile-fill',
						value: '分类',
						fontSize: 25
					},
					{
						icon: 'icon-clock-fill',
						iconSize: 70,
						fontSize: 25,
						value: '特选',
						custom: true,
						customColor: 'pink',
						customFontColor: 'white'
					},
					{
						icon: 'icon-clock-fill',
						value: '购物车',
						fontSize: 25
					},
					{
						icon: 'icon-times',
						value: '我的',
						fontSize: 25
					}
				],
			};
		},
		created() {
			let sys = uni.getSystemInfoSync();
			this.bodyHeight = (sys.screenHeight - ((sys.screenHeight - sys.safeArea.bottom) + (sys.statusBarHeight + 45)) - uni.upx2px(52 + 45)) + 'px';
		},
		onLoad(option) {
			console.log(option)
			
		},
		methods: {
			// 选中tab回调事件
			tabBarChange(e) {
				this.tabIndex = e.index;
			}
		}
	};
</script>
<style>
</style>
<style lang="scss" scoped>
	.warps {
		height: 100%;
		overflow: hidden;
		
		.center_warp  {
			overflow: auto;
		}
	}
</style>
