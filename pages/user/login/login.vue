<template>
    <view class="content">
        <view class="avatorWrapper">
            <view class="avator">
                <image class="img" src="/static/logo.png" mode="widthFix"></image>
            </view>
        </view>
        <view class="form">
            <view class="inputWrapper">
                <input class="input" type="text" value=""  required v-model="userInfo.username" placeholder="请输入用户名"/>
            </view>
            <view class="inputWrapper">
                <input class="input" type="password" value="" required v-model="userInfo.password" placeholder="请输入密码"/>
            </view>
            <view class="loginBtn">
                <text class="btnValue" @click="submitLogin()">登录</text>
            </view>
            <view class="forgotBtn" @click="toRegister()">
                <text>去注册</text>
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
				                // staffAddress: '',
				                // staffAge: '',
				                // staffName: '',
				                // staffPhone: '',
				                // staffSex: '',
				                // staffIdNum:'',
				          },
			}
		},
		methods: {
			 submitLogin (){
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
					 title: '请输入正确的密码',
					 icon:'none',
					 duration: 2000
					 });
					 return false
				 }
				  uni.request({
					  url: this.$baseUrl+'loginByUserName',
					  method: 'POST',
					  data: this.userInfo,
					  header:{'content-type':'application/x-www-form-urlencoded'},
					  success: (res)=>{
						  if(res.data.code==200){
							  uni.showToast({
							  title: '登录成功',
							  duration: 2000
							  });
							  // 
							  try {
								  console.log(res.data.data)
							      uni.setStorageSync('loginUserInfo', res.data.data);
								  //执行socket连接
								   // uni.setStorageSync('socketTask',new WebSocket('ws://121.196.99.253:8081/webSocket?id='+this.loginUserInfo.id));
								   this.$websocket.commit('setUid',res.data.data.id)
								   this.$websocket.dispatch('webSocketInit');//初始化ws

							  } catch (e) {
							      // error
							  }
							  uni.switchTab({
							  url: '/pages/index/index'
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
		// 登录校验
		// 1.用户名和密码不为空
		// 2.用户名组成？
		// 3.密码组成+密码长度
		checkUserName(){
			const reg1 = /^[a-zA-Z0-9_-]{4,16}$/
			return reg1.test(this.userInfo.username)
		},
		checkPassword(){
			// const reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{6,11}$/
		    const reg2=/^[0-9]{6,11}$/
			return reg2.test(this.userInfo.password)
		},
		
		toRegister(){
			uni.navigateTo({
						url:"/pages/user/login/register/register"
			})
		}
	},
	}
</script>

<style>
 .content {
      /*  background: #377EB4; */
	    background: url('/static/background.jpg');
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
        margin-top: 80px;
    }
    .inputWrapper{
        width: 100%;
        height: 80upx;
        background: white;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 25px;
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
        margin-top: 50px;
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
