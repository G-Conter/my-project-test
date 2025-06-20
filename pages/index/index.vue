<template>
	<view class="page">
		<image class="login-background" src="../../static/背景.png" mode=""></image>
		<view class="log-box">
			<image class="logo" src="../../static/logo.png" mode=""></image>
			<view class="login-box">
				<view class="login-text-box">
					<view class="account-login-box" @click="accountLoginTextClick(0)">
						<text :class="{ 'login-text-box-text': true, 'login-text-active': active==0 }">账号登陆</text>
						<view :class="{active: active==0}">
						</view>
					</view>
					<view class="rapid-login-box" @click="rapidLoginTextClick(1)">
						<text :class="{ 'login-text-box-text': true, 'login-text-active': active==1 }">快捷登录</text>
						<view :class="{active: active==1}">
						</view>
					</view>
				</view>
				<!-- <view class="login-text-box">
					<view class="account-login-box">
						<text class="login-text-box-text">账号登陆</text>
						<view class="selected-item">
						</view>
					</view>
					<view class="rapid-login-box">
						<text class="login-text-box-text">快捷登录</text>
						<view class="selected-item">
						</view>
					</view>
				</view> -->
				<view v-if="this.active == 0">
					<form action="#">
						<view class="phone-box">
							<i class="iconfont phone-icon">&#xe640;</i>
							<input class="phone-number" type="text" placeholder="请输入手机号"  placeholder-class="phone-placeholder">
						</view>
						<hr />
						<view class="password-box">
							<i class="iconfont password-icon">&#xe82b;</i>
							<input class="password-number" type="password"  placeholder="请输入您的密码" placeholder-class="password-placeholder"/>
						</view>
						<hr />
						<text class="forget-password-text" @click="forget()">忘记密码?</text>
						<button class="login-btn">登录</button>
					</form>
				</view>
				<view v-if="this.active == 1">
					快捷登录
				</view>
				<view class="remarks-box">
						<!-- <checkbox class="remarks-checkbox"/> -->
						<view :class="{'agree-radio' : !radioShow, 'agree-radio-active' : radioShow}" @click="agree()"></view>
						<text class="remarks-text">已阅读并同意</text>
						<text class="remarks-text remarks-agreement" @click="agreement()"> 《用户协议》</text>
						<text class="remarks-text">与</text>
						<text class="remarks-text remarks-agreement" @click="privacy()">《隐私协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			constants: {},
			active: 0,
			radioShow: false,
		};
	},
	onLoad() {
		
	},
	methods: {
		accountLoginTextClick(id){
			this.active = id
		},
		rapidLoginTextClick(id){
			this.active = id
		},
		forget() {
			uni.navigateTo({
			url: '/pages/forget/forget'
			})
		},
		agree(){
			this.radioShow = !this.radioShow
		},
		agreement(){
			uni.navigateTo({
			url: '/pages/agreement/agreement'
			})
		},
		privacy(){
			uni.navigateTo({
			url: '/pages/privacy/privacy'
			})
		},
		onClick_1() {
		  alert(1);
		},
	},
};

</script>

<style>
	@import 'index.css';
</style>
