<template>
	<view>
		<u-navbar :custom-back="linkToMy" :is-back="true" title="用户列表" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button style="margin-right: 30rpx;" size="mini" type="success" @click="linkToAddUser()">增加</u-button>
			</view>
		</u-navbar>
		<view class="status_bar"></view>
		<u-cell-group>
			<u-cell-item title="用户名" v-for="(item, index) in userList" @tap="linkTo(item)"  :key="index" :value="item.username" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[
				],
				loginUserInfo:{},
			}
		},
		onLoad(){
			//获取登录者的缓存
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			//获取所有用户信息
			this.getUsers()
		},
		onShow(){
			//获取登录者的缓存
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			//获取所有用户信息
			this.getUsers()
		},
		methods: {
			linkToMy(){
				uni.switchTab({
				url: '/pages/user/my'
				});
			},
			getUsers(){
				uni.request({
					url:this.$baseUrl+'/api/user/users',
					method:"GET",
					success:(res)=>{
						if(res.data.code==200){
							this.userList=res.data.data
							uni.showToast({
							title: '获取用户信息成功',
							duration: 2000
							});
						}else{
							uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration: 2000
							});  
						}
					}
				})
			},
			linkTo(item){
				this.$u.route({
					url: 'pages/user/usersInfoManage?user='+JSON.stringify(item)
				});
			},
			linkToAddUser(){
				this.$u.route({
					url: 'pages/user/addUserInfo'
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