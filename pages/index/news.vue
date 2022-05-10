<template>
	<view class="">
		<tm-button @click="$refs.toast.show({model:'load', label: ' '})" size='m'>load</tm-button>
		<tm-button @click="$refs.toast.hide()" size='m'>hide</tm-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			btnChange() {}
		}
	}
</script>

<style>
</style>
