<template>
	<view class="">
		<tm-sheet color="pink" round="b-20" :margin="0" :padding="[32, 10]" shadow="0">
			<tm-listitem class="mb-10" color="pink" :margin="[0,32]"  title="用户信息" label="详情"	 title-color="#fff" :show-left-icon="true" shadow="0" >
				<template v-slot:left>
					<tm-avatar src="https://picsum.photos/200" :size="120" ></tm-avatar>
				</template>
				<template v-slot:label>
					<view class="text-white">详情</view>
				</template>
				<template v-slot:rightIcon>
					<tm-icons :size="35" name="icon-cog-fill" color="burl" @click="setChagen"></tm-icons>
				</template>
			</tm-listitem>
		</tm-sheet>
		<view class="mt--50">
			<tm-sheet :margin="[50, 10]" round="8">
				<tm-col grid="4">
					<view class="py-10 text-size-n text-grey-darken-1">收藏</view>
					<view class="py-10 text-size-n">3410</view>
				</tm-col>
				<tm-col grid="4">
					<view class="py-10 text-size-n text-grey-darken-1">积分</view>
					<view class="py-10 text-size-n">99999</view>
				</tm-col>
				<tm-col grid="4">
					<view class="py-10 text-size-n text-grey-darken-1">优惠券</view>
					<view class="py-10 text-size-n">0</view>
				</tm-col>
			</tm-sheet>
		</view>
		<tm-sheet padding="0">
			<view class="text-size-n text-weight-b mb-24 border-b-1 pa-20">订单中心</view>
			<tm-grid color="blue" :list="[
					{icon:'icon-QQ',text:'待付款',color:'blue',dot:true,dotIcon:'icon-minus'},
					{icon:'icon-weibo',text:'待发货',iconSize:40,color:'blue',dot:true,dotIcon:'icon-check'},
					{icon:'icon-pengyouquan',text:'待收货',color:'green',fontColor:'green',dot:true,dotIcon:'icon-clock'},
					{icon:'icon-aliwangwang',text:'售后/退款',color:'blue-grey',dot:true,dotIcon:'icon-redo'},
				]" ></tm-grid>
		</tm-sheet>
		<tm-sheet padding="0">
			<view class="text-size-n text-weight-b mb-24 border-b-1 pa-20">我的服务</view>
			<tm-grid color="blue" :list="[
					{icon:'icon-QQ',text:'我的余额',color:'blue',dot:true,dotIcon:'icon-minus'},
					{icon:'icon-weibo',text:'地址信息',iconSize:40,color:'blue',dot:true,dotIcon:'icon-check'},
					{icon:'icon-pengyouquan',text:'我的收藏',color:'green',fontColor:'green',dot:true,dotIcon:'icon-clock'},
					{icon:'icon-aliwangwang',text:'优惠券',color:'blue-grey',dot:true,dotIcon:'icon-redo'},
					{icon:'icon-aliwangwang',text:'积分商城',color:'blue-grey',dot:true,dotIcon:'icon-redo'},
					{icon:'icon-aliwangwang',text:'积分明细',color:'blue-grey',dot:true,dotIcon:'icon-redo'},
				]" ></tm-grid>
		</tm-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			setChagen() {
				console.log('setChagen')
			}
		}
	}
</script>

<style>
</style>
