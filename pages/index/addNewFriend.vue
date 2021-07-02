<template>
	<view>
		<u-navbar :is-back="true" title="添加好友" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button style="margin-right: 30rpx;" size="mini" type="success" @click="createGroup()">提交</u-button>
			</view>
		</u-navbar>
		<!-- 不是好友的用户列表 -->
		<!-- <evan-checkbox v-model="checked">{{}}</evan-checkbox> -->
		<view style="width:90%;margin-top: 10rpx;margin-left: 20rpx;margin-right: 20rpx;">
			 <evan-checkbox-group >
					<evan-checkbox v-model="item.check" v-for="(item,index) in friendList" :key="index" :label="item.username">{{item.username}}</evan-checkbox>
			 </evan-checkbox-group>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendList:{}
			}
		},
		onLoad(){
			//获取登录者信息缓存
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			this.getFriends()
		},
		methods: {
			//获取联系人（好友）
			getFriends(){
				uni.request({
					url:this.$baseUrl+'/api/user/users',
					method:"GET",
					success:(res)=>{
						console.log(res.data.data)
						if(res.data.code==200){
							this.friendList=res.data.data
							this.friendList.forEach(function(item){
								item.check=false
							})
						}else{
							uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration: 2000
							});  
						}
					}
				});
			},
		}
	}
</script>

<style>

</style>
