<template>
	<view class="login_warp fulled-height cart-hieght white flex-column">
		<tm-menubars title=" " :color="$tm.vx.state().user.themeColor" flat>
		</tm-menubars>

		<view class="fulled pa-n20" :class="$tm.vx.state().user.themeColor">
			<view class="text-size-xl text-weight-b mb-10">你好,</view>
			<view class="text-size-xl text-weight-b">欢迎登录</view>
		</view>

		<view class="fulled  white round-l-15 flex-1 mt--n12 round-r-15 ">
			<view class="mt-n25">
				<tm-form ref="formata" @submit="submit">
					<view class="ma-n10">
						<tm-input name="phone" required vertical title="账号" title-class="text-weight-b"
							v-model="form.phone" :border-bottom="false" border-color="grey-lighten-1"
							bg-color="grey-lighten-5">
						</tm-input>

						<tm-input name="password" required vertical title="密码" title-class="text-weight-b"
							v-model="form.password" :border-bottom="false" border-color="grey-lighten-1"
							bg-color="grey-lighten-5">
						</tm-input>
						<view class="text-size-s text-red mt-25 pl-n8">温馨提示</view>
						<view class="text-size-s text-red mt-10 pl-n8">使用账号密码登录的，手机号必须已经关联过客户</view>
					</view>
					<view class="px-24 mt-n15 ml-n10 mr-n10">
						<view class="mb-n10">
							<tm-button navtie-type="form" theme="bg-gradient-blue-accent" :round="24" block>登录</tm-button>
						</view>
					</view>
				</tm-form>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginType: false, // 登录类型，1=授权登录，2密码登录
				loading: false,
				form: {
					phone: '',
					password: '',
					name: ''
				}
			}
		},
		onLoad() {},
		methods: {
			// 用户授权登录
			submit: uni.$tm.throttle(function(row) {
				if(row === false) return;
				this.$refs.toast.show({
					showBody: false,
					mask: true,
					model: 'load',
					label: '正在登录中'
				});
				row.userId = uni.$tm.vx.state().user.userInfo.userId;
				row.shopId = uni.$tm.vx.state().user.userInfo.shopId;
				uni.$http.post('/wx/login', row, { load: false }).then(res => {
					uni.$tm.vx.actions('user/getUserInfo', row.userId );
					this.$refs.toast.hide();
					this.pageApi('/pages/index/index');
				}).catch(() => { this.$refs.toast.hide() })
			}),
		}
	}
</script>

<style lang="scss" scoped>
	.login_warp {

		.center {}
	}
</style>
