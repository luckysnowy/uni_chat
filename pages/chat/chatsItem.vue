<template>
	<view>
		<u-navbar :custom-back="linkToIndex" :is-back="true" :title="chatFriendInfo.username" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		<view class="slot-wrap" slot="right">
			<u-button style="margin-right: 30rpx;" size="mini" type="error" :throttle-time="10" @click="upload()">上传文件</u-button>
		</view>
		</u-navbar>
		
		<view>
				<el-upload
				        ref="upload"
		                style="display: inline"
		                :auto-upload="false"
		                :on-change="handleChange"
		                :file-list="fileList"
		                :action='"http://121.196.99.253:8081/api/file/upload"'
						:show-file-list="false"	
						:disabled="true"
						:on-success="onSuccess"
						:limit="1">
		        </el-upload>
					<!-- <u-upload action="#" :file-list="fileList" :auto-upload="false" max-count="1"></u-upload> -->
				<!-- <button class="send" @tap="upload()">发送文件</button> -->
		</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.sourceId == loginUserInfo.id ? 'push':'pull' ">
						<image src="/static/img2.jpg" mode="aspectFill" class="pic"></image>
						<view class="content" v-if="item.agreement!=4">
						{{item.content}}
						<!-- <image v-if="item.type==1":src="/static/"+item.content></image> -->
						</view>
						<view class="content" v-if="item.agreement==4">
						<a :href="item.content">{{item.content}}</a>
						<!-- <image v-if="item.type==1":src="/static/"+item.content></image> -->
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容" placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button v-if="content.length!=0" class="send" @tap="send(0,'1')">发送消息</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginUserInfo:{},
				chatFriendInfo:{
				},
				talkList:[],
				chatListsRe:[],
				chatListsSe:[],
				chatLists:[],
				talkListUnsort:[],
				content:"",
				socketTask:null,
				newsReceive:{},
	            // addClicked:false
				fileList:[]
			}
		},
		
		computed: {
		    //监听接收到的消息
			socketMsgs() {
				return this.$websocket.getters.socketMsgs
		    }
		},
		onLoad(option){
		    this.loginUserInfo=uni.getStorageSync('loginUserInfo');
			this.chatFriendInfo=JSON.parse(option.user)
			console.log(this.chatFriendInfo);
			this.getChatsDetial()
		},
		watch: {
			'socketMsgs': {
		        //处理接收到的消息
				handler: function() {
				    let that = this
					console.log("接收到msg")
					let sMsg = that.socketMsgs
					if(sMsg!="没有传入id或者 此id已经在线"){
						
						let isexist =true
						this.talkList.forEach(item=>{
								if(item.id==sMsg.id){
									isexist=false
								}
						})
						if(isexist==true){
							this.talkList.push(JSON.parse(sMsg))
							console.log('talklist',this.talkList)
						}
					}
					console.log(sMsg)
		          }
			}
		
		},
		methods: {
			onSuccess(res) {
				uni.showToast({
				title: '文件发送成功',
				duration: 2000,
				icon:'none'
				});
				// this.content
				console.log(res.data)
				let strs=res.data.split('/')
				let filename=strs[strs.length-1]
				console.log(filename)
				this.send(4,filename)
			    // res.data.data
			},
			 // onError(res) {
			 //                this.$alert('创建失败', '提示', {
			 //                    confirmButtonText: '确定',
			 //                    callback: action => {
			 //                       console.log("上传失败")
			 //                    },
			 //                })
			 //             },
			handleChange(file, fileList) {
			    this.fileList = fileList;
			    // console.log(fileList)
			},
			upload(){
		        if(this.fileList.length==0){
							uni.showToast({
							title: '请选择要发送的文件',
							duration: 2000,
							icon:'none'
							});
							// return false
				}else{
					let fd = new FormData();
					fd.append("name",this.fileList[0].name)
					fd.append("file",this.fileList[0].raw)
					console.log('该上传啦！')
					this.submit()
					// uni.request({
					// 	url:this.$baseUrl+'/api/file/upload',
					// 	method:'POST',
					// 	data:fd,
					// 	success:(res)=>{
					// 		// console.log(res.data)
					// 		// console.log(res.data.data)
					// 		if(res.data.code==200){
					// 			this.contacts=res.data.data
					// 		}else{
					// 			uni.showToast({
					// 			title: res.data.msg,
					// 			icon:'none',
					// 			duration: 2000
					// 			});  
					// 		}
					// 	}
					// })
					// uni.request({
					// 		  url: this.$baseUrl+'/api/file/upload',
					// 		  method: 'POST',
					// 		  data: fd,
					// 		  header:{"Content-Type": "multipart/form-data"},
					// 		  success: (res)=>{
					// 			  console.log(res)
					// 		  		if(res.data.code==200){
													
					// 				}else{ 
					// 		  		}
					// 		  }
					// 	  });
					}
			},
			submit() {
			             this.$nextTick(() => {
			                  this.$refs.upload.submit()
			            })
			},
			getChatsDetial(){
				this.getReceiveMessage()
			},
			getReceiveMessage(){
				let type=0
				let isGroup=0
				uni.request({
					url:this.$baseUrl+'/api/news/news/'+this.loginUserInfo.id+'/'+type+'/'+isGroup,
					method:'GET',
					success:(res=>{
						if(res.data.code==200){
							this.chatListsRe=res.data.data
							this.getSendMessage()
						}else{
						}
					})
					})
			},
			getSendMessage(){
				let type=1
				let isGroup=0
				uni.request({
					url:this.$baseUrl+'/api/news/news/'+this.loginUserInfo.id+'/'+type+'/'+isGroup,
					method:'GET',
					success:(res=>{
						if(res.data.code==200){
							this.chatListsSe=res.data.data
							// console.log(this.chatListsSe)
							this.chatLists=this.chatListsRe.concat(this.chatListsSe)
							// console.log(this.chatLists)
							this.talkListUnsort = this.chatLists.filter(item => {
							        return ((item.sourceId==this.loginUserInfo.id&&item.targetId==this.chatFriendInfo.id)||
									(item.sourceId==this.chatFriendInfo.id&&item.targetId==this.loginUserInfo.id))
							});
							
							console.log(this.talkListUnsort)
							this.talkList=this.sortKey(this.talkListUnsort,'id')
							console.log(this.talkList)
						}else{
							// return false
						}
					})
					})
			},
			sortKey(array,key){
			    return array.sort(function(a,b){
			     var x = a[key];
			     var y = b[key];
			     return ((x<y)?-1:(x>y)?1:0)
			    })
			},
			
			send(type,filename){
				
				let content=""
				if(type==0){
					// if(this.content.length==0){
					// 	uni.showToast({
					// 	title: '还没有输入要发送的内容哦~',
					// 	duration: 2000
					// 	});
					// 	return false
					// }else{
						content=this.content
					// }
				}else if(type==4){
					content="http://121.196.99.253:8081/api/file/download/"+filename
				}
					uni.request({
						url:this.$baseUrl+'/api/news/new',
						method:'POST',
						data:{sourceId:this.loginUserInfo.id,targetId:this.chatFriendInfo.id,
						      agreement:type,content:content,time:new Date(),targetType:0},
					    success:(res=>{
							console.log(res)
							if(res.data.code==200){
								this.getChatsDetial()
								this.content=''
							}else{
								
							}
						})
					})
			},
			linkToIndex(){
				// this.$u.route({
				// 	url: "pages/chat/news"
				// });
				uni.switchTab({
				url: '/pages/index/index'
				});
			},
			}
	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";
	page{
		background-color: #F3F3F3;
		font-size: 28rpx;
	}
	
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top:var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		
		&.show{
			transform:translateY(0);
		}
	}
	
	.box-1{
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.box-2{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		
		>view{
			padding: 0 20rpx;
			height: 100rpx;
		}
		
		.content{
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}
		
		.send{
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;
			
			&:active{
				background-color: #5fc496;
			}
		}
		
		.send1{
			// background-color: #6959CD
			// color: #fff;
			height: 64rpx;
			// margin-left: 20rpx;
			// border-radius: 32rpx;
			// padding: 0;
			width: 120rpx;
			// line-height: 62rpx;
		    
			// &:active{
			// 	background-color: #5fc496;
			// }
		}
		.slot-btn {
			width: 120rpx;
			height: 64rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgb(244, 245, 246);
			border-radius: 10rpx;
		}
		
		.slot-btn__hover {
			background-color: rgb(235, 236, 238);
		}
	}
	
	.talk-list{
		padding-bottom: 20rpx;
		
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #333;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #fff;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background-color: #a0e959;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #a0e959;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>
