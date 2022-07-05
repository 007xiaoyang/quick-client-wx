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
			<tm-sliderNav :round="0" :color="$tm.vx.state().user.themeColor" textOverflow="text-overflow"
				:width="180" @change="change" rang-key="categoryName" :list="tabsGoods" text bg-color="grey-lighten-3">
			</tm-sliderNav>

			<view class="right-warp">
				<tm-tabs :color="$tm.vx.state().user.themeColor" v-model="tabIndex" :list="tabsGoods[tabIndex].children" align="left"
					range-key="categoryName" :active-border-color="$tm.vx.state().user.themeColor"></tm-tabs>
				<!--右边 :fixed="false", 高度跟随父元素 (不在组件上定义class,避免部分小程序平台编译丢失, 如支付宝,钉钉小程序) -->
				<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
					@up="upCallback">

				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				tabsGoods: [],
				tabIndex: 0 // tab下标
			}
		},
		methods: {
			upCallback(page) {
				
				// tabs异步获取
				const {clientId, shopId} = uni.$tm.vx.state().user.userInfo
				uni.$http.get('/wx/goods/getCategoryGoodsList', {clientId: clientId, shopId: shopId }, {that: this}).then(res => {
					console.log(res)
					this.tabsGoods = res;
				}).catch(() => {})
				this.mescroll.endSuccess(0);
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
					this.tabIndex = i
					this.goods = []; // 先置空列表,显示加载进度条
					this.mescroll.resetUpScroll(); // 重置列表数据
				}
			},
			change(e) {
				console.log(e)
			}
		}
	}
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
