<template>
	<view class="fulled-height cart-hieght hidden grey-lighten-3">
		<view class="scroll">
			<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<tm-sheet margin="0" round="0" :padding="[0, 32, 0, 0]" color="grey-lighten-3" shadow="0">
					<tm-sheet v-for="(item,index) in cartbar" :key="index" :margin="[32, 0, 32, 32]" color=""
						padding="0" class="mb-20">
						<tm-cartCellListFood border="" :mdata="item" :cart-num.sync="item.buy">
							<template v-slot:first>
								<tm-checkbox dense border-color="pink" color="bg-gradient-pink-accent"
									v-model="item.checkbox" model="round" round="rounded"></tm-checkbox>
							</template>
							<template v-slot:stepper>
								<tm-stepper v-model="item.buy" :step="1" color="bg-gradient-pink-accent" min="1"
									:round="25" circular></tm-stepper>
							</template>
						</tm-cartCellListFood>
					</tm-sheet>
				</tm-sheet>
			</mescroll-uni>
		</view>

		<!-- <tm-cartBarFood :bottom="bottom" :safe="false" padding="pb-20" color="blue" btnColor="bg-gradient-red-accent"
			:list="cartbar">
			<template v-slot>
				<tm-checkbox border-color="pink" color="bg-gradient-pink-accent" v-model="checked" label="全选"
					model="round" round="rounded"></tm-checkbox>
				<view class="flex flex-col">
					<view class="text-weight-b text-pink flex-center">
						<text class="text-size-xs">￥</text>
						<text class="text-size-lg">0</text>
					</view>
				</view>
			</template>
			<template v-slot:btn>
				<tm-button size="n" font-color="white" :theme="cartbar.length > 0 ? 'pink' : 'grey'" round="24">去结算
				</tm-button>
			</template>
		</tm-cartBarFood> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		props: {
			bottom: {
				type: Boolean | String,
				default: 0
			}
		},
		data() {
			return {
				checked: false,
				cartbar: [{
					img: 'https://picsum.photos/300?k=1',
					title: '产品3（任选）',
					label: '这个产品是只有几个融会',
					price: 36.2,
					salePrice: 76.4,
					saleLabel: ['7折优惠', '首单减3元'],
					unit: '/斤',
					id: 3,
					buy: 2,
					itemId: 0,
					checkbox: true
				}]
			}
		},
		methods: {
			upCallback(page) {
				// tabs异步获取
				this.mescroll.endSuccess(1);
			}
		}
	}
</script>

<style lang="scss">
	.cart-hieght {
		height: calc(100% - 120rpx);
	}
</style>
