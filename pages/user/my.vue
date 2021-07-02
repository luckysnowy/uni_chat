<template>
	<view class="content">
	 <view class="header">
	 	<view class="header_left">
	 		<u-avatar @tap="previewImage" src="/static/img2.jpg" mode="square" size="100"></u-avatar>
	 		<view class="header_left_content">
	 			<view class="header_left_content_name">{{loginUserInfo.username}}</view>
	 			<!-- <view class="header_left_content_number">userInfo.</view> -->
	 		</view>
	 	</view>
	 	<view class="header_right" @tap="linkToPerson">
	 		<!-- <u-icon style="position: relative;right: 20rpx;top: 10rpx;" :name="src1" size="40"></u-icon> -->
	 		<u-icon name="arrow-right"></u-icon>
	 	</view>
	 </view>
	 <view style="height: 10rpx;"></view>
	 <!-- 1为管理员 -->
	 <u-cell-group v-if="loginUserInfo.userType==1">
	 	<u-cell-item @tap="linkTo(index)" v-for="(item, index) in groupList" :key="index" :title="item.title" :title-style="{ marginLeft: '30rpx' }">
	 		<u-icon slot="icon" :name="item.icon" :color="item.color" size="40"></u-icon>
	 	</u-cell-item>
	 </u-cell-group>
	 <view style="height: 10rpx;"></view>
	 <u-cell-group>
	 	<u-cell-item title="退出登录" @click="linkToLogout" :arrow="false" :title-style="{ marginLeft: '30rpx' }">
	 		<u-icon slot="icon" name="close" color="#409eff" size="40"></u-icon>
	 	</u-cell-item>
	 </u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupList: [
					{
						title: '员工信息管理',
						color: '#50E3C2',
						icon: 'account'
					}
				],
				loginUserInfo:{
				                username:'',
				                password:'',
				                staffAddress: '',
				                staffAge: '',
				                staffName: '',
				                staffPhone: '',
				                staffSex: '',
				                staffIdNum:'',
				},
			};
		},
		onLoad(option) {
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
		},
		methods: {
			linkToPerson(){
				this.$u.route({
					url: 'pages/user/person'
				});
			},
			linkToLogout(){
				uni.removeStorageSync('loginUserInfo');
				//关闭socket连接
				if(this.$websocket.state.socketTask){
				this.$websocket.state.socketTask.close()
				}
				// this.$websocket.dispatch('webSocketCloseAction')
				this.$u.route({
					url: 'pages/user/login/login'
				});
			},
			linkTo(index){
				if(index==0){
					// 管理用户信息页面
					this.$u.route({
						url: 'pages/user/getUsersInfo'
					});
				}
			},
		}
    }
</script>
<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 120rpx 38rpx;
		background-color: #ffffff;

		&_left {
			display: flex;
			align-items: center;

			&_content {
				padding-left: 20rpx;

				&_name {
					font-weight: bold;
					font-size: 36rpx;
				}

				&_number {
					color: #969799;
					font-size: 28rpx;
					padding-top: 16rpx;
				}
			}
		}

		&_right {
			font-size: 28rpx;
			color: #969799;
		}

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 6rpx;
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>

