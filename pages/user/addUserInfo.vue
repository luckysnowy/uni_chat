<template>
<view>
		<!-- <u-navbar :is-back="true" title="新增用户信息" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		</u-navbar> -->
		        <view class="row b-b">
		            <text class="tit">用户名</text>
		            <input class="input" type="text" v-model="userInfo.username" placeholder="请输入用户名" placeholder-class="placeholder" />
		        </view>
				<view class="row b-b">
				    <text class="tit">密码</text>
				    <input class="input" type="password" v-model="userInfo.password" placeholder="请输入密码" placeholder-class="placeholder" />
				</view>
		        <view class="row b-b">
		            <text class="tit">姓名</text>
		            <input class="input" type="text" v-model="userInfo.staffName" placeholder="请输入姓名" placeholder-class="placeholder" />
		        </view>
		        <view class="row b-b">
		            <text class="tit">年龄</text>
		            <input class="input" type="number" v-model="userInfo.staffAge" placeholder="请输入年龄" placeholder-class="placeholder" />
		        </view>
		        <view class="row b-b">
		            <text class="tit">性别</text>
		            <input class="input" type="text" v-model="userInfo.staffSex" placeholder="请输入性别" placeholder-class="placeholder" />
		        </view>
				<view class="row b-b">
				    <text class="tit">身份证号</text>
				    <input class="input" type="text" v-model="userInfo.staffIdNum" placeholder="请输入身份证号" placeholder-class="placeholder" />
				</view>
				<view class="row b-b">
				    <text class="tit">手机号</text>
				    <input class="input" type="text" v-model="userInfo.staffPhone" placeholder="请输入手机号" placeholder-class="placeholder" />
				</view>
		        <view class="row b-b">
		            <text class="tit">常住地</text>
		            <input class="input" type="text" v-model="userInfo.staffAddress" placeholder="请输入地址" placeholder-class="placeholder" />
		        </view>
				<view class="row b-b">
				    <text class="tit">用户类型</text>
				    <input class="input" type="number" v-model="userInfo.userType" placeholder="请输入用户类型" placeholder-class="placeholder" />
				</view>
		        <button class="add-btn" @click="add()">提交</button>
		    </view>
		</template>
<script>
	export default {
		data() {
			return {
				userInfo:{
				                username:'',
				                password:'',
				                staffAddress: '',
				                staffAge: '',
				                staffName: '',
				                staffPhone: '',
				                staffSex: '',
				                staffIdNum:'',
								userType:0,
				          },
			}
		},
		methods: {
			//用户名、密码、职工ID必填
				//校验
				checkUserName(){
					const reg1= /^[a-zA-Z0-9_-]{4,16}$/
					return reg1.test(this.userInfo.username)
				},
				checkPassword(){
					const reg2=/^[0-9]{6,11}$/
					return reg2.test(this.userInfo.password)
				},
				// checkName(){
					
				// },
				checkSex(){
					if(this.userInfo.staffSex!=''&&this.userInfo.staffSex!='男'
					&&this.userInfo.staffSex!='女'){
						return false
					}
					return true
				},
				checkStaffId(){
					// checkStaffNum(){
						const reg3=/^[0-9]{11,11}$/
						return reg3.test(this.userInfo.staffIdNum)
					// },
				},
				checkPhone(){
					if(this.userInfo.staffPhone!=''){
						const reg4=/^1(3|4|5|6|7|8|9)\d{9}$/
						return reg4.test(this.userInfo.staffPhone)
					}else{
						return true
					}
				},
				add(){
					if(!this.checkUserName()){
						uni.showToast({
						title: '请输入正确的用户名',
						icon:'none',
						duration: 2000
						});
						return false
					}
					if(!this.checkPassword()){
						uni.showToast({
						title: '请输入长度为6-11的密码（由数字组成）',
						icon:'none',
						duration: 2000
						});
						return false
					}
					if(!this.checkSex()){
						uni.showToast({
						title: '请输入正确的性别',
						icon:'none',
						duration: 2000
						});
						return false
					}
					// if(!this.checkStaffId()){
					// 	uni.showToast({
					// 	title: '请输入正确的职工号',
					// 	icon:'none',
					// 	duration: 2000
					// 	});
					// 	return false
					// }
					if(!this.checkPhone()){
						uni.showToast({
						title: '请输入正确的手机号',
						icon:'none',
						duration: 2000
						});
						return false
					}
				
					
					uni.request({
								    url: this.$baseUrl+'/api/user/user/',
									method: 'POST',
									data: this.userInfo,
									success: (res)=>{
										  			if(res.data.code==200){
														uni.showToast({
														title: '新增成功',
														duration: 2000
														});
														//跳转列表页面
														this.$u.route({
															url: 'pages/user/getUsersInfo'
														});
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
			deleteUser(){
				uni.request({
					url:this.$baseUrl+'/api/user/user/'+this.userInfo.id,
					method:'DELETE',
					success:(res)=>{
						if(res.data.code==200){
							uni.showToast({
								title: '删除成功',
								duration: 2000
							});
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							});
						}
					}
				});
			}
			}
		}
</script>

<style lang="scss">
    page {
        padding-top: 16upx;
    }
 
    .row {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 30upx;
        height: 110upx;
        background: #fff;
 
        .tit {
            flex-shrink: 0;
            width: 120upx;
            font-size: 30upx;
 
        }
 
        .input {
            flex: 1;
            font-size: 30upx;
 
        }
 
        .icon-shouhuodizhi {
            font-size: 36upx;
 
        }
    }
 
    .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 690upx;
        height: 80upx;
        margin: 60upx auto;
        background-color: rgb(28, 42, 134);
        color: #fff;
		// color: #EAF6F9;
        border-radius: 10upx;
        // box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
		
    }
</style>
