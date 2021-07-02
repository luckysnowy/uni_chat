<template>
    <view class="content">
        <view class="avatorWrapper">
            <view class="avator">
                <image class="img" src="/static/logo.png" mode="widthFix"></image>
            </view>
        </view>
        <view class="form">
            <view class="inputWrapper">
                <input class="input" type="text" value="" v-model="userInfo.username" placeholder="请输入用户名"/>
            </view>
            <view class="inputWrapper">
                <input class="input" type="password" value="" v-model="userInfo.password" placeholder="请输入密码"/>
            </view>
			<view class="inputWrapper">
			    <input class="input" type="text" value="" v-model="userInfo.staffIdNum" placeholder="请输入身份证号"/>
			</view>
            <view class="loginBtn">
                <text class="btnValue" @click="submitRegister()">注册</text>
            </view>
            <view class="forgotBtn" @click="toLogin()">
                <text>去登录</text>
            </view>
        </view>
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
			    showLogin: false,
				
			}
		},
		methods: {
			//提交注册
			 submitRegister (){
				 if(!this.checkUserName()){
					 uni.showToast({
					 title: '用户名由4-16位数字或字母组成',
					 icon:'none',
					 duration: 2000
					 });
					 return false
				 }
				 if(!this.checkPassword()){
					 uni.showToast({
					 title: '密码由6-11位数字或字母组成',
					 icon:'none',
					 duration: 2000
					 });
					 return false
				 }
				 // if(!this.checkStaffNum()){
					//  uni.showToast({
					//  title: '请输入正确的11位职工号',
					//  icon:'none',
					//  duration: 2000
					//  });
					//  return false
				 // }
				  uni.request({
					  url: this.$baseUrl+'/api/user/user',
					  method: 'POST',
					  data: this.userInfo,
					  success: (res)=>{
					  						  if(res.data.code==200){
					  							  uni.showToast({
					  							  title: '注册成功',
					  							  duration: 2000
					  							  });
												  this.userInfo.username=''
												  this.userInfo.password=''
												  this.userInfo.staffIdNum=''
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
			//输入校验
			checkUserName(){
				const reg1 = /^[a-zA-Z0-9_-]{4,16}$/
				return reg1.test(this.userInfo.username)
			},
			checkPassword(){
				// const reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{6,11}$/
			    const reg2=/^[0-9]{6,11}$/
				return reg2.test(this.userInfo.password)
			},
			checkStaffNum(){
				const reg3=/^[0-9]{11,11}$/
				return reg3.test(this.userInfo.staffIdNum)
			},
		    //路由跳转
			toLogin(){
				uni.navigateTo({
							url:"/pages/user/login/login"
				})
			},
	},
	}
</script>

<style>
 .content {
      /*  background: #377EB4; */
	    background: url('/static/background2.jpg');
        width: 100vw;
        height: 100vh;
    }
    .avatorWrapper{
        height: 30vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    .avator{
        width: 200upx;
        height: 200upx;
        overflow: hidden;
    }
    .avator .img{
        width: 100%
    }
    .form{
        padding: 0 100upx;
        margin-top: 30px;
    }
    .inputWrapper{
        width: 100%;
        height: 80upx;
        background: white;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 20px;
    }
    .inputWrapper .input{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 15px;
    }
    .loginBtn{
        width: 100%;
        height: 80upx;
        background: #77B307;
        border-radius: 50upx;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .loginBtn .btnValue{
        color: white;
    }
    .forgotBtn{
        text-align: center;
        color: #EAF6F9;
        font-size: 15px;
        margin-top: 20px;
    }
</style>
