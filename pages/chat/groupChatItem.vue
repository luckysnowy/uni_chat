<template>
	<view>
		<u-navbar :custom-back="linkToIndex" :is-back="true" title="群聊聊天" :background="{ background: '#F6F7F8' }"
			title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button style="margin-right: 30rpx;" size="mini" type="error" :throttle-time="10" @click="upload()">
					上传文件</u-button>
			</view>
		</u-navbar>

		<view>
			<el-upload ref="upload" style="display: inline" :auto-upload="false" :on-change="handleChange"
				:file-list="fileList" :action='"http://121.196.99.253:8081/api/file/upload"' :show-file-list="false"
				:disabled="true" :on-success="onSuccess" :limit="1">
			</el-upload>
		</view>
		<view class="box-1" id="list-box">
			<view class="talk-list" ref="chatnew">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<!-- <p class="p">{{item.SourceId}}</p> -->
					<view class="item flex_col" :class=" item.sourceId == loginUserInfo.id ? 'push':'pull' ">
						<!-- <p class="p">{{item.SourceId}}</p> -->
						<image src="/static/img2.jpg" mode="aspectFill" class="pic"></image>
						<view class="content" v-if="item.agreement!='4'">
							{{item.sourceId}}:{{item.content}}
							<!-- <image v-if="item.type==1":src="/static/"+item.content></image> -->
						</view>
						<view class="content" v-if="item.agreement=='4'">
							<a :href="item.content">{{item.sourceId}}:{{item.content}}</a>
							<!-- <image v-if="item.type==1":src="/static/"+item.content></image> -->
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容"
						placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button v-if="content.length!=0" class="send" @tap="send(0,'1')">发送消息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import websocket1 from '@/store/websocketStoreGroup.js'
	export default {
		data() {
			return {
				loginUserInfo: {},
				socketInfo: {},
				// talkList: [{agreement:0,content:"hi~",id:17,sourceId:4,targetId:2,targetType:1,time:"2021-06-25T13:41:14.985Z"}],
				talkList: [
					// {"agreement":'0',"content":"hi~",
					// "id":17,"sourceId":4,"targetId":2,
					// "targetType":1,
					// "time":"2021-06-25T13:41:14.985Z"},
					// {agreement:'0',content:"hi~2",
					// id:17,"sourceId":4,targetId:2,
					// targetType:1,
					// time:"2021-06-25T13:41:14.985Z"},
					],
				// chatListsRe: [],
				content: "",
				socketTask: null,
				fileList: [],
				// newchat:{},
				// newchat1:{"agreement":"0","content":"hi~","id":17,"sourceId":4,"targetId":2,"targetType":1,"time":"2021-06-25T13:41:14.985Z"},
			}
		},

		computed: {
		    //监听接收到的消息
			socketGroupMsgs() {
				return websocket1.getters.socketGroupMsgs
		    }
		},
		watch: {
			'socketGroupMsgs': {
		        //处理接收到的消息
				handler: function() {
				    let that = this
					console.log("接收到msg")
					let sMsg = that.socketGroupMsgs
					if(sMsg!="没有传入id或者 此id已经在线"){
						    let jsons=JSON.parse(sMsg)
							if(jsons.sourceId!=this.loginUserInfo.id){
								this.talkList.push(JSON.parse(sMsg))
								console.log('talklist',this.talkList)
							}
					}
					console.log(sMsg)
		          }
			}
		
		},
		
		onLoad(option) {
			this.loginUserInfo = uni.getStorageSync('loginUserInfo');
			this.socketInfo = JSON.parse(option.socketInfo)
			console.log(this.socketInfo);
			websocket1.commit('setUid',this.loginUserInfo.id)
			websocket1.commit('setSid',this.socketInfo.groupId)
			websocket1.dispatch('webSocketInit');//初始化ws
		},
		
		// onShow(){
		// 	// this.createWebSocket()
		// 	this.socketMessageReceive()
		// },
		// onUnload() {
		// 	//关闭socket
		// 	uni.closeSocket()
		// },
		methods: {
			onSuccess(res) {
				uni.showToast({
					title: '文件发送成功',
					duration: 2000,
					icon: 'none'
				});
				// this.content
				console.log(res.data)
				let strs = res.data.split('/')
				let filename = strs[strs.length - 1]
				console.log(filename)
				this.send(4, filename)
				// res.data.data
			},
			handleChange(file, fileList) {
				this.fileList = fileList;
				// console.log(fileList)
			},
			upload() {
				if (this.fileList.length == 0) {
					uni.showToast({
						title: '请选择要发送的文件',
						duration: 2000,
						icon: 'none'
					});
					// return false
				} else {
					let fd = new FormData();
					fd.append("name", this.fileList[0].name)
					fd.append("file", this.fileList[0].raw)
					console.log('该上传啦！')
					this.submit()
				}
			},
			submit() {
				this.$nextTick(() => {
					this.$refs.upload.submit()
				})
			},
			//暂时不用
			getChatsDetial() {
				this.getReceiveMessage()
			},
			getReceiveMessage() {
				let type = 0
				let isGroup = 1
				uni.request({
					url: this.$baseUrl + '/api/news/news/' + this.loginUserInfo.id + '/' + type + '/' + isGroup,
					method: 'GET',
					success: (res => {
						if (res.data.code == 200) {
							this.chatListsRe = res.data.data
							this.getSendMessage()
						} else {}
					})
				})
			},
			getSendMessage() {
				let type = 1
				let isGroup = 1
				uni.request({
					url: this.$baseUrl + '/api/news/news/' + this.loginUserInfo.id + '/' + type + '/' + isGroup,
					method: 'GET',
					success: (res => {
						if (res.data.code == 200) {
							this.chatListsSe = res.data.data
							// console.log(this.chatListsSe)
							this.chatLists = this.chatListsRe.concat(this.chatListsSe)
							// console.log(this.chatLists)
							this.talkListUnsort = this.chatLists.filter(item => {
								return ((item.sourceId == this.loginUserInfo.id && item.targetId ==
										this.chatFriendInfo.id) ||
									(item.sourceId == this.chatFriendInfo.id && item
										.targetId == this.loginUserInfo.id))
							});

							console.log(this.talkListUnsort)
							this.talkList = this.sortKey(this.talkListUnsort, 'id')
							console.log(this.talkList)
						} else {
							// return false
						}
					})
				})
			},
			sortKey(array, key) {
				return array.sort(function(a, b) {
					var x = a[key];
					var y = b[key];
					return ((x < y) ? -1 : (x > y) ? 1 : 0)
				})
			},
            //到这儿都不用
			send(type, filename) {

				let content = ""
				if (type == 0) {
					// if(this.content.length==0){
					// 	uni.showToast({
					// 	title: '还没有输入要发送的内容哦~',
					// 	duration: 2000
					// 	});
					// 	return false
					// }else{
						content=this.content
					// }
				} else if (type == 4) {
					content = "http://121.196.99.253:8081/api/file/download/" + filename
				}
				let sendData = {
					sourceId: this.loginUserInfo.id,
					targetId: parseInt(this.socketInfo.groupId),
					agreement: type,
					content: content,
					time: new Date(),
					targetType: 1
				}
				uni.request({
					url: this.$baseUrl + '/api/news/new',
					method: 'POST',
					data: sendData,
					success: (res => {
						console.log(res)
						if (res.data.code == 200) {
							// this.getChatsDetial()
							this.content = ''
							this.talkList.push(sendData)
						} else {

						}
					})
				})
			},
			linkToIndex() {
				websocket1.state.socketTask.close()
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			createWebSocket() {
				if ('WebSocket' in window) {
					if (!this.socketTask) {
						var socket = 'ws://121.196.99.253:8081/groupWebSocket?userId=' + this.loginUserInfo.id +
							'&groupId=' + this.socketInfo.groupId
						this.socketTask = new WebSocket(socket);
					}
				} else {
					alert('该浏览器不支持websocket!');
				}
				this.socketTask.onopen = function(event) {
					console.log('建立群聊连接');
				}

				this.socketTask.onclose = function(event) {
					console.log('连接关闭');
				}

				this.socketTask.onmessage = function(event) {
						console.log('收到消息:' + event.data)
						// this.newchat=event.data
						if(event.data!= "没有传入id或者 此id已经在线"){
							// if(type of this.newchat)
							this.newchat=JSON.parse(event.data)
							console.log('解析结果')
							console.log(this.newchat)
							if("undefined"==typeof this.talkList){
								this.talkList=[]
							}
							// this.$nextTick(() => {})

							// this.$nextTick(() => {
								this.talkList.push(this.newchat)
								// this.talkList.push(event.data)
								console.log('talkList:')
								console.log(this.talkList)
								this.$forceUpdate()

							// })
						}
					},

					this.socketTask.onerror = function() {
						// alert('websocket通信发生错误！');
					}

				window.onbeforeunload = function() {
					this.socketTask.close();
				}

			},
			connectSocketInit() {
					let that = this
					uni.connectSocket({
						url: 'ws://121.196.99.253:8081/groupWebSocket?userId=' + this.loginUserInfo.id +
							'&groupId=' + this.socketInfo.groupId,
						success(data) {
							console.log("websocket连接成功");
						},
					});
					uni.onSocketOpen(function(res) {
						console.log('WebSocket连接已打开');
						uni.sendSocketMessage({
							data: that.message,
						});
					});
					uni.onSocketError(function(res) {
						console.log('WebSocket连接打开失败，请检查！');
					});
					uni.onSocketMessage(function(res) {
						console.log('收到服务器内容：' + res.data);
						if(res.data!= "没有传入id或者 此id已经在线"){
							if ("undefined" == typeof this.talkList) {
								this.talkList = []
							}
							this.talkList.push(res.data)
						}
					});
					uni.onSocketClose(function(res) {
						console.log('WebSocket 已关闭！');
					});
				},
				// 发送
				// send(e) {
				// 	uni.sendSocketMessage({
				// 		data: this.message,
				// 	});
				// },
		}


	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";

	page {
		background-color: #F3F3F3;
		font-size: 28rpx;
	}

	/* 加载数据提示 */
	.tips {
		position: fixed;
		left: 0;
		top: var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0, 0, 0, 0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform: translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;

		&.show {
			transform: translateY(0);
		}
	}

	.box-1 {
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;

		/* 兼容iPhoneX */
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
	}

	.box-2 {
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

		>view {
			padding: 0 20rpx;
			height: 100rpx;
		}

		.content {
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}

		.send {
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;

			&:active {
				background-color: #5fc496;
			}
		}

		.send1 {
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

	.talk-list {
		padding-bottom: 20rpx;
        .p {
        	width: 92rpx
        }
		/* 消息项，基础类 */
		.item {
			padding: 20rpx 20rpx 0 20rpx;
			align-items: flex-start;
			align-content: flex-start;
			color: #333;

			.pic {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}

			

			.content {
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}

			/* 收到的消息 */
			&.pull {
				.content {
					margin-left: 32rpx;
					background-color: #fff;

					&::after {
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
			&.push {
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;

				.content {
					margin-right: 32rpx;
					background-color: #a0e959;

					&::after {
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
