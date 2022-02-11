<template>
	<view class="warps" :class="[$tm.vx.state().tmVuetify.black ? 'black' : 'grey-lighten-4']">
		<tm-menubars :title="menuTitle" color="pink" :showback="false" :flat="true">
			<template v-slot:left>
				<view class="pl-10 text-size-g py-1">诚信商城</view>
			</template>
		</tm-menubars>
		
		<view class="center_warp" :style="{height: bodyHeight}">
			<home v-if="tabIndex == 0" class="fulled-height"></home>
			<classify v-else-if="tabIndex == 1" class="fulled-height"></classify>
			<news v-else-if="tabIndex == 2" class="fulled-height"></news>
			<cart v-else-if="tabIndex == 3" class="fulled-height" :bottom="cardBar"></cart>
			<my v-else-if="tabIndex == 4" class="fulled-height"></my>
		</view>

		<tm-bottomnavigation class="tabbar" icon-color="pink" icon-color-grey="grey-lighten-1" :list="tabbar" 
			@change="tabBarChange"></tm-bottomnavigation>
	</view>
</template>

<script>
	import Home from './home.vue'
	import Classify from './classify.vue'
	import News from './news.vue'
	import Cart from './cart.vue'
	import My from './my.vue'
	export default {
		components: { Home, Classify, News, Cart, My},
		data() {
			return {
				bodyHeight: '100%',
				cardBar: 0,
				menuTitle: '首页',
				tabIndex: 4,
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
						fontSize: 25,
						value: '消息',
						/* custom: true,
						iconSize: 70,
						customColor: 'pink',
						customFontColor: 'white' */
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
			this.cardBar = ((sys.screenHeight - sys.safeArea.bottom) + uni.upx2px(52 + 45));
			this.bodyHeight = (sys.screenHeight - ((sys.screenHeight - sys.safeArea.bottom) + (sys.statusBarHeight + 45)) - uni.upx2px(52 + 45)) + 'px';
		},
		onLoad(option) {
			console.log(option)
			
		},
		methods: {
			// 选中tab回调事件
			tabBarChange(e) {
				this.tabIndex = e.index;
				this.menuTitle = e.item.value;
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
