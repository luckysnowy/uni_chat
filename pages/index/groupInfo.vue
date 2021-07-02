<template>
	<view>
		<!-- 好友信息页面 -->
		<u-navbar :is-back="true" :custom-back="linkToGroup" title="群聊信息页面" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		    <view class="slot-wrap" slot="right">
		    	<u-button style="margin-right: 30rpx;" size="mini" type="error" @click="deleteGroup()">删除</u-button>
		    </view>
		</u-navbar>
		<view class="status_bar"></view>
		<u-cell-group>
			<!-- <u-cell-item  :arrow="false" title="群主"  :value="admin.username" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item> -->
			<u-cell-item  v-for="(item,index) in userInGroup" :arrow="false"  :title=" item.id==groupInfo.administratorId ?'群主':'群成员'" :value="item.username" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		</u-cell-group>
		
		  <u-button @click="linkToGroupChat(groupInfo)" style="width: 50%;margin-top: 20rpx;" ><image style="width:30rpx;height: 30rpx;margin-right: 10rpx;"src="/static/news.png"></image>发消息</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// groups:[],
				groupInfo:{},
				loginUserInfo:{},
				// friendList:[],
				userInGroup:[],
				admin:{},
				groupSearch:[]
			}
		},
		onLoad(option){
			// console.log(this.groupInfo)
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			console.log(option.id)
			this.groupInfo.id=option.id
			//获取groups信息
			// this.getGroups()
			this.getGroupById(this.groupInfo.id)
			console.log(this.groupInfo);
		},
		methods: {
			linkToGroupChat(item){
				let str=JSON.stringify({userId:this.loginUserInfo.id,groupId:this.groupInfo.id})
				this.$u.route({
					url: 'pages/chat/groupChatItem?socketInfo='+str
				});
			},
			// getGroups(){
			// 	uni.request({
			// 		url:this.$baseUrl+'/api/group/groups/'+this.loginUserInfo.id,
			// 		method:'GET',
			// 		success:(res=>{
			// 			if(res.data.code==200){
			// 				this.groups=res.data.data
			// 				this.groups.forEach((item=>{
			// 					if(item.id==this.groupInfo.id){
			// 						this.groupInfo=item
			// 					}
			// 				}))
			// 				let usersid=this.groupInfo.userStr.split('&')
			// 				for ( var i=0;i<usersid.length;i++){
			// 					this.friendList.forEach((item)=>{
			// 						if(item.id==usersid[i]){
			// 							this.userInGroup.push(item)
			// 						}
			// 					})
			// 				}
			// 			}else{
			// 				uni.showToast({
			// 				title: res.data.msg,
			// 				icon:'none',
			// 				duration: 2000
			// 				});  
			// 			}
			// 		})
			// 	})
			// },
			getGroupById(id){
				uni.request({
					url:this.$baseUrl+'/api/group/group/'+id,
					method:'GET',
					success:(res)=>{
							console.log(res)
							if(res.data.code==200){
							   for (var key in res.data.data){
								   console.log(key)
								   // this.groupInfo=key
								   let strs=key.split(',')[1]
								   this.groupInfo.administratorId=strs.split('=')[1]
								   console.log(res.data.data[key])
								   this.userInGroup=res.data.data[key]
								   // this.userInGroup.forEach((item)=>{
									  //  // if(item.id==this.groupInfo.administratorId){
										 //  //  this.admin=item
									  //  // }
								   // })
							   }
								
							}else{
								
							}
						}
				})
			},
			linkToGroup(){
				this.$u.route({
					url: 'pages/chat/groupChart'
				});
			},
			deleteGroup(){
				uni.request({
						url:this.$baseUrl+'/api/group/group/'+this.groupInfo.id,
						method:'DELETE',
						success:(res)=>{
							console.log(res)
							if(res.statusCode==204){
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								//跳转页面
								this.$u.route({
									url: 'pages/chat/groupChart'
								});
							}else{
								uni.showToast({
									title: "删除失败",
									duration: 2000
								});
							}
						}
					});
				
			},
			//获取联系人（好友）
		// 	getFriends(){
		// 		uni.request({
		// 			url:this.$baseUrl+'/api/user/users',
		// 			method:"GET",
		// 			success:(res)=>{
		// 				// console.log(res.data)
		// 				// console.log(res.data.data)
		// 				if(res.data.code==200){
		// 					this.contacts=res.data.data
		// 				}else{
		// 					uni.showToast({
		// 					title: res.data.msg,
		// 					icon:'none',
		// 					duration: 2000
		// 					});  
		// 				}
		// 			}
		// 		});
		// 	},
		// }
		}
	}
</script>

<style>

</style>
