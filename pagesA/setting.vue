<template>
	<view class="hidden fixed fulled" :class="[$tm.vx.state().tmVuetify.black ? 'black' : 'grey-lighten-4']">
		<tm-menubars title="个人设置" :color="$tm.vx.state().user.themeColor"></tm-menubars>
		
		<tm-listitem title="头像" :margin="[0,0]" :round="0" :shadow="0" border-bottom>
			<template v-slot:rightIcon>
				<tm-button v-if="canIUse" fab icon="icon-QQ" icon-size="10" theme="bg-gradient-orange-accent" size="xs" dense titl open-type="chooseAvatar" @chooseavatar="(e) => {submit('chooseavatar', e)}">
					<template v-slot:icon>
						<tm-avatar :src="$tm.vx.state().user.userInfo.portrait || 'https://quick-wx-web.oss-cn-shenzhen.aliyuncs.com/wx_bb28d27ebcd7493d8841583007fd3d1c'" :size="60"></tm-avatar>
					</template>
				</tm-button>
				<tm-button v-else fab icon="icon-QQ" icon-size="10" theme="bg-gradient-orange-accent" size="xs" dense titl open-type="chooseAvatar" @click="submit('upload')">
					<template v-slot:icon>
						<tm-avatar :src="$tm.vx.state().user.userInfo.portrait || 'https://quick-wx-web.oss-cn-shenzhen.aliyuncs.com/wx_bb28d27ebcd7493d8841583007fd3d1c'" :size="60"></tm-avatar>
					</template>
				</tm-button>
			</template>
		</tm-listitem>
		<tm-listitem title="昵称" :margin="[0,0]" :round="0" :shadow="0" border-bottom :value="$tm.vx.state().user.userInfo.name" @click="dialog.title = '设置昵称',dialog.model = 'confirm',dialog.content = '', $refs.dialog.open('昵称')"></tm-listitem>
		<tm-listitem title="手机号" :margin="[0,0]" :round="0" :shadow="0" border-bottom :value="$tm.vx.state().user.userInfo.phone" :show-right-icon="false"></tm-listitem>
		<tm-listitem title="关联信息" :margin="[0,0]" :round="0" :shadow="0" border-bottom :value="$tm.vx.state().user.userInfo.clientName" :show-right-icon="false"></tm-listitem>
		<tm-listitem title="密码登录" :margin="[0,0]" :round="0" :shadow="0" border-bottom @click="pageApi('/pagesA/login/login')"></tm-listitem>
		<tm-listitem title="退出登录" :margin="[0,0]" :round="0" :shadow="0" border-bottom @click="dialog.title = '温馨提示',dialog.model = 'dialog', dialog.content = '确定要退出当前账号吗？',$refs.dialog.open('退出登录')"></tm-listitem>
		
		<tm-dialog
			ref="dialog"
			:title="dialog.title"
			:model="dialog.model"
			inputType="nickname"
			:inputVal="$tm.vx.state().user.userInfo.name"
			confirmText="确定" 
			cancelText="取消" 
			:confirmColor="'bg-gradient-'+$tm.vx.state().user.themeColor+'-accent'" 
			:cancelColor="$tm.vx.state().user.themeColor" 
			:content="dialog.content" 
			theme="split"
			@confirm="(e) => {submit('out', e)}"
		>
			
		</tm-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dialog: {
					title: '温馨提示',
					model: 'dialog',
					content: ''
				}
			}
		},
		computed: {
			canIUse() {
				return wx.canIUse('button.open-type.chooseAvatar')
			}
		},
		mounted() {
		},
		methods: {
			submit: uni.$tm.throttle(function(type, e) {
				
				switch (type){
					case 'out':
						if (e == '退出登录') {
							uni.setStorageSync('userToken', '');
							uni.$tm.vx.commit('user/setStateAttr', { key: 'userToken', val: ''});
							this.pageApi('/pages/index/index', 'redirectTo')
						} else {
							uni.$tm.vx.actions('user/modifyUser', {id: uni.$tm.vx.state().user.userInfo.userId, name: e } );
						}
						break;
					case 'upload':
						uni.$http.urlImgUpload({
						    count: "1",//默认 9
						}).then(res => {
								const info = $tm.vx.state().user.userInfo;
								uni.$tm.vx.actions('user/modifyUser', {id: info.userId, portrait: res[0].imgUrl } );
						}).catch(() => {});
						break;
					case 'chooseavatar':
						console.log(e)
						uni.$http.urlFileUpload({
						    files: [{path: e.detail.avatarUrl}],
						}).then(res => {
								const info = $tm.vx.state().user.userInfo;
								uni.$tm.vx.actions('user/modifyUser', {id: info.userId, portrait: res[0].imgUrl } );
						}).catch(() => {});
						break;
					default:
						break;
				}
			}),
		}
	}
</script>

<style>
</style>