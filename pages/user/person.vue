<template>
	<view>
		<u-navbar :custom-back="linkToMy" :is-back="true" title="个人信息" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		</u-navbar>
		<view class="status_bar"></view>
		<u-cell-group>
			<u-cell-item @click="linkToEdit()"  title="用户名"  :value="loginUserInfo.username" :title-style="{ marginLeft: '10rpx' }">
			<!-- <u-input :value="loginUserInfo.username" :value-style="{marginRight: '10rpx' }"></u-input> -->
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.username"></u-input> -->
			<u-cell-item   @click="linkToEdit()" title="姓名"  :value="loginUserInfo.staffName" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		 <!--   <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffName"></u-input> -->
			<u-cell-item   @click="linkToEdit()" title="年龄" :value="loginUserInfo.staffAge" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffAge"></u-input> -->
			<u-cell-item  @click="linkToEdit()" title="性别"  :value="loginUserInfo.staffSex" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffSex"></u-input> -->
			<u-cell-item  @click="linkToEdit()" title="职工号"  :value="loginUserInfo.staffIdNum" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffIdNum"></u-input> -->
			<u-cell-item  @click="linkToEdit()" title="手机号"   :value="loginUserInfo.staffPhone" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffPhone"></u-input> -->
			<u-cell-item  @click="linkToEdit()" title="常住地"   :value="loginUserInfo.staffAddress" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item  :arrow="false" title="用户类型"   :value="loginUserInfo.userType" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<!-- <u-input v-show="loginUserInfo.edit==true" :value="loginUserInfo.staffAddress"></u-input> -->
		</u-cell-group>
		<!-- <view>
			<u-button  size="mini" type="success" @click="linkToEdit()">修改信息</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		onLoad(option) {
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
		},
		methods: {
			linkToBack(){
				this.$u.route.back(-1)
			},
			linkToMy(){
				uni.switchTab({
				url: '/pages/user/my'
				});
			},
			linkToEdit(){
				// this.loginUserInfo.edit=true
				this.$u.route({
					url: 'pages/user/updateInfo'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.slot-btn {
	}
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
</style>
