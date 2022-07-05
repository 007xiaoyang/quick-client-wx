<template>
	<view
		@click.stop="overCloseCHange"
		v-if="show"
		class="tm-dialog fixed flex-center"
		:style="{
			height: sysinfo + 'px'
		}"
	>
		<view @click.stop="" :class="[show ? 'success' : '']">
			<view class="relative" :class="[clickOverlay ? 'clickover' : '']">
				<tm-sheet :black="black_tmeme" :padding="[0, 0]" classname="overflow" :width="600" :round="round" shadow="10">
					<view class="close absolute r-19 t--19" v-if="showClose">
						<tm-icons :size="46" color="red" name="icon-times-circle" @click="close()"></tm-icons>
					</view>
					<view class="text-size-g flex-center text-weight-b px-32 pt-32 " :class="[black_tmeme ? 'bk' : '', bottomBorder ? 'border-b-1' : '']">
						<slot name="title">{{ title }}</slot>
					</view>
					<view class="px-50 py-n12 text-size-n text-align-center" style="max-height:700rpx;overflow-y: auto;">
						<slot name="default">
							<view >
								<text :class="[black_tmeme ? 'text-white' : 'text-grey-darken-3']">{{ content }}</text>
								<view v-if="model == 'confirm'" class="pt-24">
									<tm-input bg-color="grey-lighten-5" :inputType="inputType" @input="suren" :black="black_tmeme" v-model="inputValSd" :border-bottom="false" adjust-position :flat="true"></tm-input>
								</view>
							</view>
						</slot>
					</view>

					<slot name="button">
						<view v-if="theme == 'merge'" class="py-0 flex-between">
							<tm-button
								:fllowTheme="fllowTheme"
								:height="80"
								text
								:black="black_tmeme"
								@click="concelClick"
								v-if="showCancel"
								:theme="black_tmeme ? 'grey-darken-4' : cancel_color_tmeme"
								round="0"
								shadow="0"
								style="width: 50%;"
								block
								:loading="loading"
							>
								{{ cancelText }}
							</tm-button>
							<tm-button
								:fllowTheme="fllowTheme"
								:height="80"
								:black="black_tmeme"
								@click="confirmClick"
								:theme="color_tmeme"
								round="0"
								shadow="0"
								:style="{
									width: showCancel ? '50%' : '100%'
								}"
								block
								:loading="loading"
							>
								{{ confirmText }}
							</tm-button>
						</view>
						<view v-if="theme == 'split'" class="px-40 pb-40 flex-between">
							<tm-button
								:fllowTheme="fllowTheme"
								text
								:height="72"
								:black="black_tmeme"
								@click="concelClick"
								v-if="showCancel"
								:theme="black_tmeme ? 'grey-darken-4' : cancel_color_tmeme"
								round="24"
								font-size="30"
								shadow="0"
								style="width: 46%;"
								block
								:loading="loading"
							>
								{{ cancelText }}
							</tm-button>
							<tm-button
								:fllowTheme="fllowTheme"
								:height="72"
								:black="black_tmeme"
								@click="confirmClick"
								:theme="color_tmeme"
								round="24"
								font-size="30"
								shadow="0"
								:style="{
									width: showCancel ? '46%' : '100%'
								}"
								block
								:loading="loading"
							>
								{{ confirmText }}
							</tm-button>
						</view>
					</slot>
				</tm-sheet>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 对话框
 * @property {Boolean} value = [] 显示对话框，推荐使用value.sync或者v-model
 * @property {Boolean} black = [] 暗黑模式。
 * @property {Boolean} bottom-border = [] true,是否显示标题正文的边线。
 * @property {String} confirmColor = [] 默认：primary，确认按钮的主题颜色
 * @property {String} confirmText = [] 默认：确认，确认按钮的文字
 * @property {Boolean} showCancel = [] 默认：true，是否显示取消按钮。
 * @property {Boolean} disabled = [] 默认：false，禁用后，点击哪都关闭不了，只能通过手动设置v-model来关闭窗体。
 * @property {String} cancelColor = [] 默认：primary，取消按钮的主题色。
 * @property {String} cancelText = [] 默认：取消，取消按钮显示的文字。
 * @property {String} title = [] 默认：提示，标题。
 * @property {String} content = [] 默认：''，内容文字
 * @property {String} theme = [merge|split] 默认：'merge'，merge合并按钮，split分割按钮
 * @property {String} model = [dialog|confirm] 默认：'dialog'，对话框类型.dialog|confirm
 * @property {Number|String} round = [] 默认：'4'，圆角
 * @property {String} input-val = [] 默认：''，model=confirm,显示的输入框内容。confirm
 * @property {Boolean} over-close = [] 默认：true，点击遮罩是否关闭窗体。
 * @property {Function} confirm 确认按钮时触发，注意：如果类型为confirm则返回 的参数包含输入框的内容。
 * @property {Function} cancel 点击取消按钮时触发。
 * @example <tm-dialog  v-model="show" content="这是测试的内容"></tm-dialog>
 */
import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
import tmInput from '@/tm-vuetify/components/tm-input/tm-input.vue';
export default {
	components: { tmSheet, tmButton, tmInput },
	name: 'tm-dialog',
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		bottomBorder: {
			type: Boolean,
			default: false
		},
		black: {
			type: Boolean | String,
			default: null
		},
		confirmColor: {
			type: String,
			default: 'primary'
		},
		confirmText: {
			type: String,
			default: '确认'
		},
		showCancel: {
			type: Boolean,
			default: true
		},
		cancelColor: {
			type: String,
			default: 'primary'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		title: {
			type: String,
			default: '消息提示'
		},
		content: {
			type: String,
			default: ''
		},
		// 样式。
		theme: {
			type: String,
			default: 'merge' //merge|split merge合并按钮，split分割按钮
		},
		// 对话框类型.dialog|confirm
		model: {
			type: String,
			default: 'dialog' // dialog|confirm
		},
		round: {
			type: Number | String,
			default: 8
		},
		inputVal: {
			type: String,
			default: ''
		},
		// 跟随主题色的改变而改变。
		fllowTheme: {
			type: Boolean | String,
			default: true
		},
		overClose: {
			type: Boolean | String,
			default: false
		},
		//如果为true,需要你手动关闭。点按钮关闭不了。
		disabled: {
			type: Boolean | String,
			default: false
		},
		beforeClose: { // 是否拦截按钮事件，如为true，则不会关闭对话框，关闭需要手动执行 uni-popup 的 close 方法
			type: Boolean | String,
			default: false
		},
		showClose: {
			type: Boolean | String,
			default: false
		},
		inputType: {
			type: String,
			default: 'text'
		}
	},
	computed: {
		show: {
			get: function() {
				return this.pageShow;
			},
			set: async function(val) {
				this.pageShow = val;
				this.$emit('input', val);
				this.$emit('update:value', val);
			}
		},
		black_tmeme: function() {
			if (this.black !== null) return this.black;
			return this.$tm.vx.state().tmVuetify.black;
		},
		color_tmeme: function() {
			if (this.$tm.vx.state().tmVuetify.color !== null && this.$tm.vx.state().tmVuetify.color && this.fllowTheme) {
				return this.$tm.vx.state().tmVuetify.color;
			}
			return this.confirmColor;
		},
		cancel_color_tmeme: function() {
			return this.cancelColor;
		},
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	data() {
		return {
			inputValSd: '',
			sysinfo: 0,
			clickOverlay: false,
			loading: false,
			arg: null,
			pageShow: false,
		};
	},
	created() {
		let sysinfo = uni.getSystemInfoSync();
		// #ifdef APP || MP
		if (sysinfo.windowHeight == sysinfo.screenHeight) {
			this.sysinfo = sysinfo.screenHeight;
		} else if (sysinfo.windowHeight < sysinfo.screenHeight) {
			this.sysinfo = sysinfo.windowHeight;
		}
		// #endif
		// #ifdef H5
		if(sysinfo.screenHeight>=sysinfo.windowHeight){
			this.sysinfo = sysinfo.windowHeight;
		}else{
			this.sysinfo = sysinfo.screenHeight;
		}
		
		// #endif

		this.show = this.value;
	},
	methods: {
		open() {
			this.arg = arguments[0] ? arguments[0] : null;
			this.show = true;
		},
		close() {
			this.show = false;
			this.loading = false;
			this.$emit('input', false);
			this.$emit('update:value', false);
		},
		
		overCloseCHange() {
			if (this.overClose) {
				this.concelClick();
			} else {
				this.anifeed();
			}
		},
		anifeed() {
			let t = this;
			if (this.clickOverlay) this.clickOverlay = !this.clickOverlay;
			this.clickOverlay = true;
			uni.$tm.sleep(100).then(() => {
				t.clickOverlay = false;
			});
		},
		confirmClick() {
			if (this.loading) return
			if (this.beforeClose)
				this.loading = true;
	
			if (this.model == 'confirm') {
				if (!this.inputValSd) {
					uni.$tm.toast('请输入内容');
					this.anifeed();
					return;
				}
				this.$emit('confirm', this.inputValSd);
			} else {
				this.$emit('confirm', this.arg);
			}
			if (this.disabled) return
			this.close()
		},
		suren(e) {
			this.$emit('update:inputVal', this.inputValSd);
		},
		concelClick() {
			this.$emit('concel', this.arg);//错误的拼写兼容
			this.$emit('cancel', this.arg);//正常的拼写
			if (this.disabled == false) {
				this.show = false;
			}
		}
	}
};
</script>

<style lang="scss">
.tm-dialog {
	width: 100%;
	z-index: 600;
	background-color: rgba(0, 0, 0, 0.35);
	left: 0;
	top: 0;
	
	backdrop-filter: blur(10px);
	transition: all 0.35s;
	.success {
		animation: success 0.35s linear;
		
		// transform: scale(1);
	}
	.clickover {
		animation: clickover 0.35s linear;
	}
}
@keyframes clickover {
	0% {
		transform: scale(0.95);
	}

	50% {
		transform: scale(1.05);
	}

	100% {
		transform: scale(1);
	}
}
@keyframes success {
	0% {
		transform: scale(0.75);
		opacity: 0;
	}
	75% {
		transform: scale(1.05);
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>
