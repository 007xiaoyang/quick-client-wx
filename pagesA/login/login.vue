<template>
	<view class="login_warp fulled-height cart-hieght white flex-column">
		<tm-menubars title=" " :color="$tm.vx.state().user.themeColor" flat>
		</tm-menubars>

		<view class="fulled pa-n20" :class="$tm.vx.state().user.themeColor">
			<view class="text-size-xl text-weight-b mb-10">你好,</view>
			<view class="text-size-xl text-weight-b">欢迎登录</view>
		</view>

		<view class="fulled  white round-l-15 flex-1 mt--n12 round-r-15 " :class="{'flex-center': !loginType}">
			<view v-if="loginType" class="mt-n25">
				<tm-form ref="formata" @submit="submit">
					<view class="ma-n10">
						<tm-input name="title" required vertical title="账号" title-class="text-weight-b"
							v-model="form.name" :border-bottom="false" border-color="grey-lighten-1"
							bg-color="grey-lighten-5">
						</tm-input>

						<tm-input name="title" required vertical title="密码" title-class="text-weight-b"
							v-model="form.name" :border-bottom="false" border-color="grey-lighten-1"
							bg-color="grey-lighten-5">
						</tm-input>
						<view class="text-size-m text-deep-orange ml-n10 mt-10" @click="loginType= false">微信登录</view>
					</view>
				</tm-form>
				<view class="px-24 mt-n15 ml-n10 mr-n10">
					<view class="mb-n10">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" :round="24" block
							:loading="loading">登录</tm-button>
					</view>
				</view>
			</view>
			<view v-else class="flex-shrink" style="width: 80%;">
				<view class="mb-n10">
					<tm-button navtie-type="form" theme="bg-gradient-blue-accent" :round="24" block
						@click="loginType = true">账号登录</tm-button>
				</view>
				<view class="mb-n10">
					<tm-button theme="bg-gradient-deep-purple-accent" :round="24" block open-type="getPhoneNumber"
						@getphonenumber="getUserProfile">授权手机号登录</tm-button>
				</view>
				<tm-button theme="bg-gradient-pink-accent" :round="24" block>取消授权</tm-button>
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
					name: ''
				}
			}
		},
		onLoad() {
			console.log(this)
		},
		methods: {
			// 用户授权
			getUserProfile(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login_warp {

		.center {}
	}
</style>
