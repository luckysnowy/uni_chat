<template>
	<view>
		<u-navbar :custom-back="linkToMy" :is-back="true" title="修改个人信息" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
		</u-navbar>
		<view class="status_bar"></view>
		        <view class="row b-b">
		            <text class="tit">用户名</text>
		            <input class="input" type="text" v-model="loginUserInfo.username" placeholder="请输入用户名" placeholder-class="placeholder" />
		        </view>
				<view class="row b-b">
				    <text class="tit">密码</text>
				    <input class="input" type="password" v-model="loginUserInfo.password" placeholder="请输入密码" placeholder-class="placeholder" />
				</view>
		        <view class="row b-b">
		            <text class="tit">姓名</text>
		            <input class="input" type="text" v-model="loginUserInfo.staffName" placeholder="请输入姓名" placeholder-class="placeholder" />
		        </view>
		        <view class="row b-b">
		            <text class="tit">年龄</text>
		            <input class="input" type="number" v-model="loginUserInfo.staffAge" placeholder="请输入年龄" placeholder-class="placeholder" />
		        </view>
		        <view class="row b-b">
		            <text class="tit">性别</text>
		            <input class="input" type="text" v-model="loginUserInfo.staffSex" placeholder="请输入性别" placeholder-class="placeholder" />
		        </view>
				<view class="row b-b">
				    <text class="tit">身份证号</text>
				    <input class="input" type="text" v-model="loginUserInfo.staffIdNum" placeholder="请输入身份证号" placeholder-class="placeholder" />
				</view>
				<view class="row b-b">
				    <text class="tit">手机号</text>
				    <input class="input" type="text" v-model="loginUserInfo.staffPhone" placeholder="请输入手机号" placeholder-class="placeholder" />
				</view>
		        <view class="row b-b">
		            <text class="tit">常住地</text>
		            <input class="input" type="text" v-model="loginUserInfo.staffAddress" placeholder="请输入地址" placeholder-class="placeholder" />
		        </view>
		        <button class="add-btn" @click="save()">提交</button>
		    </view>
		</template>
	
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
				userInfo:{
					
				},
				show:false,
			}
		},
		onLoad(option) {
			this.loginUserInfo=uni.getStorageSync('loginUserInfo');
		},
		methods: {
			//校验
			checkUserName(){
				const reg1= /^[a-zA-Z0-9_-]{4,16}$/
				return reg1.test(this.loginUserInfo.username)
			},
			checkPassword(){
				const reg2=/^[0-9]{6,11}$/
				return reg2.test(this.loginUserInfo.password)
			},
			// checkName(){
				
			// },
			checkSex(){
				if(this.loginUserInfo.staffSex!=''&&this.loginUserInfo.staffSex!='男'
				&&this.loginUserInfo.staffSex!='女'){
					return false
				}
				return true
			},
			checkStaffId(){
				// checkStaffNum(){
					const reg3=/^[0-9]{11,11}$/
					return reg3.test(this.loginUserInfo.staffIdNum)
				// },
			},
			checkPhone(){
				if(this.loginUserInfo.staffPhone!=''){
					const reg4=/^1(3|4|5|6|7|8|9)\d{9}$/
					return reg4.test(this.loginUserInfo.staffPhone)
				}else{
					return true
				}
			},
			linkToMy(){
				uni.switchTab({
				url: '/pages/user/my'
				});
			},
			save(){
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
				if(!this.checkStaffId()){
					uni.showToast({
					title: '请输入正确的职工号',
					icon:'none',
					duration: 2000
					});
					return false
				}
				if(!this.checkPhone()){
					uni.showToast({
					title: '请输入正确的手机号',
					icon:'none',
					duration: 2000
					});
					return false
				}
				// this.userInfo.id=this.loginUserInfo.id
				// this.userInfo.username=this.loginUserInfo.username
				// this.userInfo.password=this.loginUserInfo.password
				// this.userInfo.staffName=this.loginUserInfo.staffName
				uni.request({
							    url: this.$baseUrl+'/api/user/user/'+this.loginUserInfo.id,
								method: 'PUT',
								data: this.loginUserInfo,
								success: (res)=>{
									  			if(res.data.code==200){
													uni.showToast({
									  				title: '修改成功',
									  				duration: 2000
									  			});
												uni.request({
														        url: this.$baseUrl+'loginByUserName',
																method: 'POST',
																data: this.loginUserInfo,
																header:{'content-type':'application/x-www-form-urlencoded'},
																success: (res)=>{
																			if(res.data.code==200){
																			  try {
																				  // console.log(res.data.data)
																			      uni.setStorageSync('loginUserInfo', res.data.data);
																			  } catch (e) {
																			      // error
																			  }
																			  this.$u.route({
																			  	url: 'pages/user/person'
																			  });
																		    }else{
																			
																		    }
																	    }
												});
												//跳转到用户信息页面
												this.$u.route({
													url: 'pages/user/person'
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