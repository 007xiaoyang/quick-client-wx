<template>
	<view class="">
		<tm-sheet :color="$tm.vx.state().user.themeColor" round="b-20" :margin="0" :padding="[32, 10]" shadow="0">
			<view class="flex-start px-15 pt-20 pb-n15">
				<view class="">
					<tm-avatar src="https://picsum.photos/200" :size="120"></tm-avatar>
				</view>
				<view class="flex-1 pl-10 text-white">
					<block v-if="$tm.vx.state().user.userToken">
						<view class="text-weight-b text-size-n">{{hidePhone($tm.vx.state().user.userInfo.phone)}}</view>
						<view class=" text-size-m" >{{$tm.vx.state().user.userInfo.clientName || '未关联'}}</view>
					</block>
					<block v-else>
						<tm-button theme="bg-gradient-deep-purple-accent"  titl :width="120" dense
							open-type="getPhoneNumber" @getphonenumber="getUserProfile">授权登录</tm-button>
					</block>
				</view>
				<view class="">
					<tm-icons :size="35" name="icon-cog-fill" color="burl" @click="pageApi('/pagesA/setting')"></tm-icons>
				</view>
			</view>
		</tm-sheet>
		<view class="mt--50">
			<tm-sheet :margin="[50, 10]" round="8">
				<tm-col grid="4">
					<view class="py-10 text-size-n text-grey-darken-1">收藏</view>
					<view class="py-10 text-size-n">0</view>
				</tm-col>
				<tm-col grid="4">
					<view class="py-10 text-size-n text-grey-darken-1">积分</view>
					<view class="py-10 text-size-n">0</view>
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
				]"></tm-grid>
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
				]"></tm-grid>
		</tm-sheet>
		
		<tm-dialog 
			v-model="dialogOpen"
			title="温馨提示"
			confirmText="去完善" 
			cancelText="返回" 
			:confirmColor="'bg-gradient-'+$tm.vx.state().user.themeColor+'-accent'" 
			:cancelColor="$tm.vx.state().user.themeColor" 
			content="授权成功,是否完善信息？有利于店铺查找关联" 
			theme="split"
			@confirm="pageApi('/pagesA/setting')"
		>
		</tm-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dialogOpen: false
			}
		},
		mounted() {
		},
		
		methods: {
			submit: uni.$tm.throttle(function(type, e) {
				switch (type){
					case 'info':
						if (this.$tm.vx.state().user.userInfo.phone) return
						this.pageApi('/pagesA/login/login');
						break;
					default:
						break;
				}
			}),
			
			// 用户授权登录
			getUserProfile: uni.$tm.throttle(function(e) {
				const that = this;
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					var info = uni.$tm.vx.state().user.userInfo;
					var loginInfo = Object.assign(info, e.detail);
					uni.$tm.vx.actions('user/authLogin', loginInfo).then(res => {
						that.dialogOpen = true;
					});
				} else {
					this.$refs.toast.show({model:'error', label: '授权失败！'})
				}
			}),
			
			setChagen() {
				console.log('setChagen')
			}
		}
	}
</script>

<style>
</style>
