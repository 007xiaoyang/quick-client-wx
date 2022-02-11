<template>
	<view class="fulled-height cart-hieght">
		<view class="scroll">
			<tm-sheet v-for="(item,index) in 10" :key="index" margin="0" color="bg-gradient-blue-accent">
				<view class="text-size-s text-weight-b mb-24">
					{{index}}这是所有组件基础的容器，它可以任意改变属性，就像一张纸一样。
				</view>
			</tm-sheet>
		</view>
		<tm-cartBarFood :bottom="bottom" :safe="false" color="blue" btnColor="bg-gradient-red-accent" :list="cartbar"></tm-cartBarFood>
	</view>
</template>

<script>
	export default {
		props: {
			bottom: {
				type: Boolean|String,
				default: 0
			}
		},
		data() {
			return {
				cartbar: [{
				img: 'https://picsum.photos/300?k=1',
				title: '产品3（任选）',
				label: '这个产品是只有几个融会',
				price: 36.2,
				salePrice: 76.4,
				saleLabel: ['7折优惠', '首单减3元'],
				unit: '/斤',
				id: 3,
				buy: 0,
				itemId: 0
			}]
			}
		}
	}
</script>

<style lang="scss"> 
	.cart-hieght {
		height: calc(100% - 100rpx);
		overflow: hidden;
		.scroll {
			overflow: auto;
			height: 100%;
		}
	}
</style>
