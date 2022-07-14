<template>
	<view class="hidden fixed fulled" :class="[$tm.vx.state().tmVuetify.black ? 'black' : 'grey-lighten-4']">
		<tm-menubars :title="$tm.vx.state().user.userInfo.shopName" :color="$tm.vx.state().user.themeColor" :showback="false" :flat="true">
			<template v-slot:left>
				<view class="pl-10 text-size-g py-1" v-show="tabIndex != 3">
					<image :src="$tm.vx.state().user.userInfo.logo || '/static/logo.jpg'" style="width: 40px; height: 40px; border-radius: 50%;"></image>
				</view>
			</template>
		</tm-menubars>

		<scroll-view class="center_warp" scroll-y :style="{ height: bodyHeight + 'px' }">
			<home v-if="tabIndex == 0" class="fulled-height"></home>
			<classify v-else-if="tabIndex == 1" class="fulled-height"></classify>
			<cart v-else-if="tabIndex == 2" class="fulled-height" :bottom="cardBar"></cart>
			<my v-else-if="tabIndex == 3" class="fulled-height"></my>
		</scroll-view>

		<tm-bottomnavigation class="tabbar" :icon-color="$tm.vx.state().user.themeColor" icon-color-grey="grey-lighten-1" :list="tabbar" @change="tabBarChange"></tm-bottomnavigation>
	</view>
</template>

<script>
import Home from './home.vue';
import Classify from './classify.vue';
import Cart from './cart.vue';
import My from './my.vue';
export default {
	components: {
		Home,
		Classify,
		Cart,
		My
	},
	data() {
		return {
			bodyHeight: '100%',
			cardBar: 0,
			menuTitle: '首页',
			tabIndex: 1,
			tabbar: [
				{
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
					value: '购物车',
					fontSize: 25
				},
				{
					icon: 'icon-times',
					value: '我的',
					fontSize: 25
				}
			]
		};
	},
	created() {
		let sys = uni.getSystemInfoSync();
		this.cardBar = sys.screenHeight - sys.safeArea.bottom + uni.upx2px(52 + 46);
		this.bodyHeight = sys.screenHeight - (sys.screenHeight - sys.safeArea.bottom + (sys.statusBarHeight + 45)) - uni.upx2px(52 + 46);
	},
	onLoad(option) {},
	onShow() {},
	methods: {
		// 选中tab回调事件
		tabBarChange: uni.$tm.throttle(function(e) {
			this.tabIndex = e.index;
			this.menuTitle = e.item.value;
		})
	}
};
</script>
<style></style>
<style lang="scss" scoped></style>
