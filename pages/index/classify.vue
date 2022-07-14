<template>
	<view class="page-warp overflow">
		<view class="top-warp">
			<!-- <view class="">
				<tm-search :bgColor="$tm.vx.state().user.themeColor" :insertColor="$tm.vx.state().user.themeColor"
					align="center" :showRight="false" :round="24" padding="pb-12"></tm-search>
			</view> -->
			<!-- <tm-tabs :color="$tm.vx.state().user.themeColor" v-model="tabIndex" :list="tabsGoods" align="left"
				range-key="categoryName" :active-border-color="$tm.vx.state().user.themeColor"></tm-tabs> -->
		</view>

		<view class="center-warp">
			<!-- 左边 -->
			<tm-sliderNav
				:round="0"
				:color="$tm.vx.state().user.themeColor"
				textOverflow="text-overflow"
				:width="170"
				@change="change"
				rang-key="categoryName"
				:list="tabsGoods"
				text
				bg-color="grey-lighten-3"
			></tm-sliderNav>

			<view class="right-warp white">
				<tm-tabs
					v-model="twoIndex"
					:color="$tm.vx.state().user.themeColor"
					:list="tabsGoods[tabIndex].children"
					align="left"
					range-key="categoryName"
					:active-border-color="$tm.vx.state().user.themeColor"
				></tm-tabs>
				<!--右边 :fixed="false", 高度跟随父元素 (不在组件上定义class,避免部分小程序平台编译丢失, 如支付宝,钉钉小程序) -->
				<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view v-for="(v, i) in 1" :key="i" class="flex mx-30 py-30 border-b-1">
						<view class="round-2 " style="height: 135rpx; width: 135rpx;"><tm-images :round="2" src="https://picsum.photos/300?id=7 "></tm-images></view>
						<view class="flex-1 ml-10 flex-column">
							<view class="text-overflow-2	text-size-n text-weight-b">产品名称</view>
							<view class="flex-1">但是</view>
							<view class="flex-between">
								<view class="text-size-g text-red mt-25 text-weight-b">¥12</view>
								<tm-stepper circular v-model="word4" :min="-10" :max="10" :step="1" :round="24" color="bg-gradient-pink-accent "></tm-stepper>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			tabsGoods: [],
			tabIndex: 0, // tab下标
			twoIndex: 0,
			word4: 0
		};
	},
	methods: {
		upCallback(page) {
			// tabs异步获取
			this.mescroll.endSuccess(0);
			const { clientId, shopId } = uni.$tm.vx.state().user.userInfo;
			// uni.$http
			// 	.get('/wx/goods/getCategoryGoodsList', { clientId: 26, shopId: 16 })
			// 	.then(res => {
			// 		console.log(res);
			// 		this.mescroll.endSuccess(res.length);
			// 		this.tabsGoods = res;
			// 	})
			// 	.catch(() => {});

			/* if(this.tabs.length == 0){
					apiGetTabs().then(res=>{
						this.tabs = res
						this.mescroll.resetUpScroll() // 重新触发upCallback
					}).catch(()=>{
						this.mescroll.endErr()
					})
					return // 此处return,先获取tabs
				}
				
				//联网加载数据
				let keyword = this.tabs[this.tabIndex]
				apiGoods(page.num, page.size, keyword).then(res=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.list.length);
					//设置列表数据
					if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods=this.goods.concat(res.list); //追加新数据
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				}) */
		},
		// 切换菜单
		tabChange(i) {
			if (this.tabIndex != i) {
				this.tabIndex = i;
				this.goods = []; // 先置空列表,显示加载进度条
				this.mescroll.resetUpScroll(); // 重置列表数据
			}
		},
		change(index) {
			this.twoIndex = 0;
			this.tabIndex = index;
		}
	}
};
</script>

<style lang="scss">
/*需给父元素设置height:100%*/
.page-warp {
	height: 100%;
	display: flex;
	flex-direction: column;

	/* 顶部区域 */
	.top-warp {
		text-align: center;
	}

	/* 中间 */
	.center-warp {
		flex: 1;
		min-width: 0;
		min-height: 0;
		/* 需给flex:1的元素加上最小高,否则内容超过会溢出容器 (如:小程序Android真机) */
		display: flex;

		// 左边
		.left-warp {
			width: 180rpx;
			height: 100%;

			.tab {
				font-size: 28rpx;
				padding: 28rpx;

				&.active {
					background-color: #fff;
				}
			}
		}

		// 右边
		.right-warp {
			flex: 1;
			min-width: 0;
		}
	}
}
</style>
