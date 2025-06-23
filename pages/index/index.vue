<template>
	<view class="page">
		<image 
			class="login-background" 
			src="../../static/background.png" 
			mode="">
		</image>
		<view class="log-box">
			<image 
				class="logo" 
				src="../../static/logo.png" 
				mode="">
			</image>
			<view class="login-box">
				<view class="login-text-box">
					<view 
						class="account-login-box" 
						@click="LoginTextClick(0)">
						<text :class="{ 'login-text-box-text': true, 'login-text-active': active==0 }">账号登陆</text>
						<view :class="{active: active==0}">
						</view>
					</view>
					<view 
						class="rapid-login-box" 
						@click="LoginTextClick(1)">
						<text :class="{ 'login-text-box-text': true, 'login-text-active': active==1 }">快捷登录</text>
						<view :class="{active: active==1}">
						</view>
					</view>
				</view>
				<view 
					class="account-login-content-box"
					v-if="this.active == 0">
					<form action="#">
						<view class="phone-box">
							<i class="iconfont phone-icon">&#xe640;</i>
							<input 
								class="phone-number" 
								type="text" 
								v-model="account" 
								placeholder="请输入手机号"
								placeholder-class="phone-placeholder">
							</input>
						</view>
						<view class="password-box">
							<i class="iconfont password-icon">&#xe82b;</i>
							<input 
								class="password-number" 
								type="password" 
								v-model="password" 
								placeholder="请输入您的密码"
								placeholder-class="password-placeholder">
							</input>
						</view>
						<text 
							class="forget-password-text" 
							@click="forget()">
							忘记密码?
						</text>
						<button 
							class="login-btn" 
							@click="login()">
							登录
						</button>
					</form>
				</view>
				<view 
					class="rapid-login-content-box"
					v-if="this.active == 1">
					快捷登录
				</view>
				<view class="remarks-box">
					<!-- <checkbox class="remarks-checkbox"/> -->
					<view 
						:class="{'agree-radio' : !radioShow, 'agree-radio-active' : radioShow}" 
						@click="agree()">
					</view>
					<text class="remarks-text">已阅读并同意</text>
					<text 
						class="remarks-text remarks-agreement" 
						@click="agreement()"> 
						《用户协议》
					</text>
					<text class="remarks-text">与</text>
					<text 
						class="remarks-text remarks-agreement" 
						@click="privacy()">
						《隐私协议》
					</text>
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
				account: '',
				password: '',
			};
		},
		onLoad() {

		},
		methods: {
			LoginTextClick(id) {
				this.active = id
			},
			forget() {
				uni.navigateTo({
					url: '/pages/forget/forget'
				})
			},
			agree() {
				this.radioShow = !this.radioShow
			},
			agreement() {
				uni.navigateTo({
					url: '/pages/agreement/agreement'
				})
			},
			privacy() {
				uni.navigateTo({
					url: '/pages/privacy/privacy'
				})
			},
			async login() {
				const account = this.account;
				const password = this.password;
				await uni.request({
					url: 'https://bz.wuht.net/api/login',
					method: 'POST',
					data: {
						'account': account,
						'password': password,
						'agent_id': 0,
					},
					header: {
						'content-type': 'application/json',
						//#ifdef H5
						'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ?
							'wechat' : 'h5',
						//#endif
						//#ifdef MP
						'Form-type': 'routine',
						//#endif
						//#ifdef APP-VUE
						'Form-type': 'app',
						//#endif
					},
					success: (res) => {
						if (res.statusCode !== 200 && res.statusCode !== 201) {
							return uni.showToast({
								title: '请求失败',
								icon: 'error',
							})
						} else {
							if (res.data.msg === "登录成功") {
								uni.setStorageSync('token', res.data.data.token);
								uni.navigateTo({
									url: '/pages/personal_information/index'
								})
							}
							console.log(res.data);
						}
					},
					fail: (err) => {
						return uni.showToast({
							title: '请求失败',
							icon: 'error',
						})
					}
				})
			}
		},
	};
</script>

<style>
	@import 'index.scss';
</style>