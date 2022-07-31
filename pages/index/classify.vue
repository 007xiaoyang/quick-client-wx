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
				@change="
					e => {
						change('slider', e);
					}
				"
				rang-key="categoryName"
				:list="tabsGoods"
				text
				bg-color="grey-lighten-3"
			></tm-sliderNav>

			<view class="right-warp white">
				<tm-tabs
					v-model="twoIndex"
					:color="$tm.vx.state().user.themeColor"
					:list="tabsGoods[tabIndex].children ? tabsGoods[tabIndex].children : []"
					align="left"
					range-key="categoryName"
					:active-border-color="$tm.vx.state().user.themeColor"
				></tm-tabs>
				<!--右边 :fixed="false", 高度跟随父元素 (不在组件上定义class,避免部分小程序平台编译丢失, 如支付宝,钉钉小程序) -->
				<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<block v-if="pagesShow">
						<block v-if="tabsGoods[tabIndex].children[twoIndex]">
							<view v-for="(v, i) in tabsGoods[tabIndex].children[twoIndex].goodsVOS" :key="i" class="flex mx-30 py-30 border-b-1">
								<view class="round-2 " style="height: 135rpx; width: 135rpx;"><tm-images :round="2" src="https://picsum.photos/300?id=7 "></tm-images></view>
								<view class="flex-1 ml-10 flex-column text-overflow">
									<view class="text-overflow-2	text-size-n text-weight-b">{{ v.goodsName }}</view>
									<view class="my-15">
										<tm-tags :color="$tm.vx.state().user.themeColor" size="s" model="outlined" dense @click.stop="selectSpectChange(v)">
											{{ specsAndStorageAndUnits(v, i).name }}
											<block v-if="isMultiple(v)"><tm-icons :size="20" name="icon-angle-down"></tm-icons></block>
										</tm-tags>
									</view>
									<view class="flex-between">
										<view class="text-size-g text-red mt-25 text-weight-b">¥12</view>
										<block v-if="v.amount">
											<tm-stepper
												circular
												v-model="tabsGoods[tabIndex].children[twoIndex].goodsVOS[i].amount"
												:round="24"
												disabledInput
												color="bg-gradient-pink-accent "
												@click="
													e => {
														change('stepper', e, i);
													}
												"
											></tm-stepper>
										</block>
										<block v-else>
											<tm-button fab icon="icon-plus" icon-size="26" theme="bg-gradient-pink-accent" size="s" dense @click="change('addStepper', i)"></tm-button>
										</block>
									</view>
								</view>
							</view>
						</block>

						<view v-if="!tabsGoods[tabIndex].children[twoIndex] || !tabsGoods[tabIndex].children[twoIndex].goodsVOS || tabsGoods[tabIndex].children[twoIndex].goodsVOS.length == 0">
							<mescroll-empty :option="{ tip: '暂无分类产品数据' }"></mescroll-empty>
						</view>
					</block>
				</mescroll-uni>
			</view>
		</view>

		<tm-poup v-model="poupShow" position="bottom"></tm-poup>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			poupShow: false,
			pagesShow: false,
			tabsGoods: [],
			tabIndex: 0, // tab下标
			twoIndex: 0,
			word4: 1
		};
	},
	computed: {
		specsAndStorageAndUnits() {
			return function(row, index) {
				var temp = { name: '', specsId: '', storageId: '', storageUnitsId: '' };
				var specsData = row.specsData;
				a: for (var i = 0; i < specsData.length; i++) {
					for (var j = 0; j < specsData[i].specsStorage.length; j++) {
						for (var k = 0; k < specsData[i].specsStorage[j].specsStorageUnits.length; k++) {
							if (
								specsData[i].specsId == specsData[i].specsStorage[j].specsId &&
								specsData[i].specsStorage[j].storageId == specsData[i].specsStorage[j].specsStorageUnits[k].storageId
							) {
								temp.name = specsData[i].specsName + '/' + specsData[i].specsStorage[j].warehouseName + '/' + specsData[i].specsStorage[j].specsStorageUnits[k].unitsName;
								temp.specsId = specsData[i].specsId;
								temp.storageId = specsData[i].specsStorage[j].storageId;
								temp.storageUnitsId = specsData[i].specsStorage[j].specsStorageUnits[k].storageUnitsId;
								break a;
							}
						}
					}
				}
				temp.name.length > 16 ? temp.name.substring(0, 17) : temp.name;
				row.temp = temp;
				return temp;
			};
		},
		isMultiple() {
			return function(row) {
				if (row.specsData.length > 1) {
					return true;
				}
				let bol = false;
				a: for (var i = 0; i < row.specsData.length; i++) {
					if (row.specsData[i].specsStorage.length > 1) {
						bol = true;
						break a;
					}
					for (var j = 0; j < row.specsData[i].specsStorage.length; j++) {
						if (row.specsData[i].specsStorage[j].specsStorageUnits.length > 1) {
							bol = true;
							break a;
						}
					}
				}
				return bol;
			};
		}
	},
	methods: {
		upCallback(page) {
			// tabs异步获取
			uni.$http
				.get('/wx/goods/getCategoryGoodsList', { clientId: 26, shopId: 16 })
				.then(res => {
					console.log(res);
					this.mescroll.endSuccess(res.length);
					this.tabsGoods = res;
					this.pagesShow = true;
				})
				.catch(() => {});
		},
		// 切换菜单
		tabChange(i) {
			if (this.tabIndex != i) {
				this.tabIndex = i;
				this.goods = []; // 先置空列表,显示加载进度条
				this.mescroll.resetUpScroll(); // 重置列表数据
			}
		},
		change(type, e, i) {
			switch (type) {
				case 'slider':
					this.twoIndex = 0;
					this.tabIndex = e;
					break;
				case 'stepper':
					if (e <= 0) {
						console.log(this.tabsGoods[this.tabIndex].children[this.twoIndex].goodsVOS[i]);
						uni.showModal({
							title: '温馨提示',
							content: '确定移除购物车嘛?',
							success: res => {
								if (res.confirm) {
									this.$set(this.tabsGoods[this.tabIndex].children[this.twoIndex].goodsVOS[i], 'amount', null);
								} else {
									this.$set(this.tabsGoods[this.tabIndex].children[this.twoIndex].goodsVOS[e], 'amount', 1);
								}
							}
						});
					}
					break;
				case 'addStepper':
					this.$set(this.tabsGoods[this.tabIndex].children[this.twoIndex].goodsVOS[e], 'amount', 1);
					break;
				default:
					break;
			}
		},

		selectSpectChange(v) {
			if (this.isMultiple(v)) {
				console.log('挑选规格', v);
				this.poupShow = true;
			}
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
