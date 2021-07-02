<template>
	<view>
		<!-- 好友信息页面 -->
		<u-navbar :is-back="true" :title="friendInfo.username" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		</u-navbar>
		<view class="status_bar"></view>
		<u-cell-group>
			<u-cell-item  :arrow="false" title="用户名"  :value="friendInfo.username" :title-style="{ marginLeft: '10rpx' }">
			<!-- <u-input :value="loginUserInfo.username" :value-style="{marginRight: '10rpx' }"></u-input> -->
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.username"></u-input> -->
			<u-cell-item  :arrow="false"  title="姓名"  :value="friendInfo.staffName" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		 <!--   <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffName"></u-input> -->
			<u-cell-item  :arrow="false"  title="年龄" :value="friendInfo.staffAge" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffAge"></u-input> -->
			<u-cell-item :arrow="false"  title="性别"  :value="friendInfo.staffSex" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffSex"></u-input> -->
			<u-cell-item :arrow="false"  title="职工号"  :value="friendInfo.staffIdNum" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffIdNum"></u-input> -->
			<u-cell-item  :arrow="false" title="手机号"   :value="friendInfo.staffPhone" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffPhone"></u-input> -->
			<u-cell-item :arrow="false"  title="常住地"   :value="friendInfo.staffAddress" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-cell-item :arrow="false" icon="chat-fill">
				
			</u-cell-item> -->
		</u-cell-group>
		
		  <u-button @click="linkToChat(friendInfo)" style="width: 50%;margin-top: 20rpx;" ><image style="width:30rpx;height: 30rpx;margin-right: 10rpx;"src="/static/news.png"></image>发消息</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendInfo:{},
				loginUserInfo:{},
			}
		},
		onLoad(option){
			this.friendInfo=JSON.parse(option.user)
		    this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			console.log(this.friendInfo);
		},
		methods: {
			linkToChat(item){
				this.$u.route({
					url: 'pages/chat/chatsItem?user='+JSON.stringify(item)
				});
			},
		}
	}
</script>

<style>

</style>
