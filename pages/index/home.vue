<!-- 菜单悬浮的原理: 通过给菜单添加position:sticky实现, 用法超简单, 仅APP端的低端机不兼容 https://caniuse.com/#feat=css-sticky -->
<template>
	<view class="fulled-height">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback"  @scroll="scroll">
			
			<tm-swiper  :round="0" :margin="0"  :autoplay="true"  :indicator-dots="true" :list="[
					'https://picsum.photos/500?jv=3',
					'https://picsum.photos/500?jv=34',
					'https://picsum.photos/500?jv=5'
				]"></tm-swiper>
			<tm-search
				suffixIcon=" "
				:showRight="false"
				:fllowTheme="false"
				color="white"
				bg-color="pink"
				insertColor="pink"
				:round="4"
				placeholder="产品搜索"
				:shadow="0"
				@focus="searchFocus"
			>
			</tm-search>
			<!-- sticky吸顶悬浮的菜单, 父元素必须是 mescroll -->
			<view class="sticky-tabs">
				<tm-tabs :bg-color="navTop > 150 ? '' : 'pink'" :color="navTop > 150 ? 'pink' : ''" :active-border-color="navTop > 150 ? 'pink' : 'white'" v-model="tabIndex" :list="['的ve', '二分', '阿迪斯发第三方', 'vrev']" range-key="name" align="left"></tm-tabs>
			</view>
			
			<!-- 数据列表 -->
			<!-- <tm-sheet v-for="(item,index) in 10" :key="index" color="bg-gradient-blue-accent">
				<view class="text-size-s text-weight-b mb-24">
					这是所有组件基础的容器，它可以任意改变属性，就像一张纸一样。
				</view>
			</tm-sheet> -->
			<view class="pa-32 ">
				<tm-flowLayout @click="itemClick" ref="wafll">
					<template  v-slot:left="{hdata}">
						<view class="round-3 shadow-2 overflow white">
							
							<block v-if="hdata.item.model!='swiper'&&hdata.item.model!='text'">
								<tm-images :previmage="false" :src="hdata.item.image"></tm-images>
								<view class="pa-10 text-size-s">
									<view class="text-overflow-2">
										<tm-tags :dense="true" model="fill" color="red"  size="xs">国庆季</tm-tags>
										<text>香港潮牌反绒皮切尔西靴男一脚蹬厚底男短款香港潮牌反绒皮切尔西靴男一脚蹬厚底男短款</text>
									</view>
									<view class="mt-24 flex-between flex-center">
										<view>
											<text class="text-size-xs text-red">￥</text>
											<text  class="text-size-lg  text-red">380</text>
											<text  class="pl-10 text-size-xs text-grey-lighten-1">1256人付款</text>
										</view>
										<view >
											<tm-menu  tip-direction="right" direction="top" ment-direction="right" :list=" ['不感兴趣','图片让我反感'  ] ">
												<view class="pr-5">
													<tm-icons color="grey-lighten-1" dense name="icon-info-circle"></tm-icons>
												</view>
											</tm-menu> 
											
										</view>
									</view>
								</view>
							</block>
							<block v-if="hdata.item.model=='swiper'">
								<view :style="{width:hdata.width+'px',height:hdata.item.height+'px'}">
									<tm-swiper dot-model="rect" :indicator-dots="true" :height="(hdata.item.height+'px')" :list=" [ 'https://picsum.photos/300?jv=3','https://picsum.photos/300?jv=3' ] " ></tm-swiper> 
								</view>
							</block>
							<block v-if="hdata.item.model=='text'">
								<view  :style="{width:hdata.item.width+'px',height:hdata.item.height+'px'}"  class="red pa-10">
									文字模块
									<view @click.stop="del(hdata)">
										<tm-button theme="white" size="s" >点击删除</tm-button>
									</view>
								</view>
							</block>
						</view>
					</template>
					<template v-slot:right="{hdata}">
						
						<view class="round-3 shadow-2 overflow white">
							<block v-if="hdata.item.model!='swiper'&&hdata.item.model!='text'">
								<tm-images :previmage="false" :src="hdata.item.image"></tm-images>
								<view class="pa-10 text-size-s">
									<view class="text-overflow-2">
										<tm-tags :dense="true" model="fill" color="red"  size="xs">天猫品牌</tm-tags>
										<text>香港潮牌反绒皮切尔西靴男一脚蹬厚底男短款香港潮牌反绒皮切尔西靴男一脚蹬厚底男短款</text>
									</view>
									<view class="mt-24 flex-between flex-center">
										<view>
											<text class="text-size-xs text-red">￥</text>
											<text  class="text-size-lg  text-red">380</text>
											<text  class="pl-10 text-size-xs text-grey-lighten-1">1256人付款</text>
										</view>
										<view>
											<tm-menu  tip-direction="right" direction="top" ment-direction="right" :list=" [ '不感兴趣','图片让我反感' ] ">
												<view class="pr-5">
													<tm-icons color="grey-lighten-1" dense name="icon-info-circle"></tm-icons>
												</view>
											</tm-menu> 
										</view>
									</view>
								</view>
								
							</block>
							<block v-if="hdata.item.model=='swiper'">
								
								<view :style="{width:hdata.item.width+'px',height:hdata.item.height+'px'}">
									<tm-swiper dot-model="round" :indicator-dots="true" :height="(hdata.item.height+'px')" :list=" [ 'https://picsum.photos/300?jv=3','https://picsum.photos/300?jv=3' ] " ></tm-swiper> 
								</view>
							</block>
							<block v-if="hdata.item.model=='text'">
								<view   :style="{width:hdata.item.width+'px',height:hdata.item.height+'px'}" class="red pa-10">
									文字模块
									<view @click.stop="del(hdata)">
										<tm-button theme="white" size="s" >点击删除</tm-button>
									</view>
								</view>
							</block>
						</view>
					</template>
				</tm-flowLayout>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				navTop: 0,
				downOption: {
					isLock: false,
					auto: false
				},
				upOption: {
					onScroll: true, // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
					toTop: {
						bottom: 250
					}
				},
				tabs:[
					{name:'全部', goods: [{}, {}, {}], num:1, y:0, curPageLen:0, hasNext:true},
					{name:'母婴', goods: null, num:1, y:0, curPageLen:0, hasNext:true},
					{name:'图书', goods: null, num:1, y:0, curPageLen:0, hasNext:true}
					],
				tabIndex: 0 // 当前菜单下标
			}
		},
		computed: {
			// 列表数据
			goods() {
				return this.tabs[this.tabIndex].goods
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				console.log('下拉刷新的回调')
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.$refs.toast.show({showBody: false, mask: true, model: 'load'})
				setTimeout(() => {
					this.$refs.toast.hide()
					this.mescroll.resetUpScroll()
				}, 10000)
				
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log('上拉加载的回调')
				console.log(this.randouh())
				this.mescroll.endSuccess(1);
			},
			// 切换菜单
			tabChange (index) {
				// 记录切换前滚动条的位置
				if(!this.preIndex) this.preIndex = 0
				let preTab = this.tabs[this.preIndex]
				preTab.y = this.mescroll.getScrollTop()
				this.preIndex = index;
				// 当前菜单的数据
				let curTab = this.tabs[index]
				if (!curTab.goods) {
					// 没有初始化,则初始化
					this.mescroll.resetUpScroll()
				} else{
					// 初始化过,则恢复之前的列表数据
					this.mescroll.setPageNum(curTab.num + 1); // 恢复当前页码
					this.mescroll.endSuccess(curTab.curPageLen, curTab.hasNext); // 恢复是否有下一页或显示空布局
					this.$nextTick(()=>{
						this.mescroll.scrollTo(curTab.y, 0) // 恢复滚动条的位置
					})
				}
			},
			
			// mescroll-uni的滚动事件 (需在up配置onScroll:true才生效)
			scroll(){
				this.navTop = this.mescroll.getScrollTop();
			},
			
			searchFocus(e) {
				console.log(e)
			},
			toTopPage(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			itemClick(e){
				console.log('itemClick',e);
				uni.$tm.toast(e.dirIndex+':'+e.childrenIndex)
				
			},
			del(e){
				this.$refs.wafll.delItemData(e.dirIndex,e.childrenIndex)
			},
			//模拟数据，添加到列表中。
			randouh(){
				
				let list2 = [];
				for(let i=0;i<8;i++){
					let h = Math.floor(Math.random()*400);
					if(h<100) h=50;
					let th = 0;
					let model = ''
					if(i==3){
						th = 80;
						model = 'swiper'
					}else if(i==6){
						th = 50
						h=1
						model = 'text'
					}
					list2.push({
						image:`https://picsum.photos/200/${h}?k=${i}`,
						height:th,
						model:model
					})
				}
				this.$nextTick(function(){
									this.$refs.wafll.pushData(list2)
								})
			},
		}
	}
</script>

<style lang="scss">
	/*
	sticky生效条件：
	1、父元素不能overflow:hidden或者overflow:auto属性。(mescroll-body设置:sticky="true"即可, mescroll-uni本身没有设置overflow)
	2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
	3、父元素的高度不能低于sticky元素的高度
	4、sticky元素仅在其父元素内生效,所以父元素必须是 mescroll
	*/
	.sticky-tabs{
		z-index: 990;
		position: sticky;
		top: var(--window-top);
		background-color: #fff;
	}
	
	// 使用mescroll-uni,则top为0
	.mescroll-uni,
	/deep/.mescroll-uni{
		.sticky-tabs{
			top: 0;
		}
	}
	
	.demo-tip{
		padding: 18rpx;
		font-size: 24rpx;
		text-align: center;
	}
</style>
