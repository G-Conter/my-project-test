<template>
	<view class="page">
		<view class="header-box">
			<text class="header-text">个人资料</text>
		</view>
		<view class="information-box">
			<view class="avatar-box">
				<view class="avatar-box-in">
					<text>头像</text>
					<view 
						class="avatar-img-box"
						@click="editImage()">
						<image
							class="avatar-img"
							src="" 
							mode="">
						</image>
						<image 
							class="edit-img"
							src="../../static/edit.png" 
							mode="">
						</image>
					</view>
				</view>
			</view>
			<view class="basic-information-box">
				<view class="avatar-box-in">
					<text>名字</text>
					<text class="name-text">{{name}}</text>
				</view>
			</view>
			<view class="basic-information-box">
				<view class="avatar-box-in">
					<text>ID号</text>
					<view class="id-number-box">
						<text class="id-number-text">{{idNumber}}</text>
						<i class="iconfont id-number-icon">&#xe6a9;</i>
					</view>
				</view>
			</view>
			<view class="basic-information-box">
				<view class="avatar-box-in">
					<text>密码</text>
					<view 
						class="account-password-box"
						@click="changePassword()">
						<text class="account-password-text">点击修改密码</text>
						<i class="iconfont right-icon">&#xe642;</i>
					</view>
				</view>
			</view>
			<view class="basic-information-box">
				<view class="avatar-box-in">
					<text>账号注销</text>
					<view 
						class="account-password-box"
						@click="cancelAccount()">
						<text class="account-password-text">注销后无法恢复，请谨慎操作</text>
						<i class="iconfont right-icon">&#xe642;</i>
					</view>
				</view>
			</view>
		</view>
		<view 
			class="save-box"
			@click="saveChanges()">
			<text class="save-text">保存修改</text>
		</view>
		<view 
			class="logOut-box"
			@click="logOut()">
			<text class="logOut-text">退出登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '名字',
				idNumber: 177333,
				
			}
		},
		onLoad() {
			console.log("进入页面")
			uni.request({
				url: 'https://bz.wuht.net/api/user',
				method: 'GET',
				data: {
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
		},
		methods: {
			editImage(){
				
			},
			changePassword(){
				
			},
			cancelAccount(){
				uni.navigateTo({
					url: '/pages/cancellation_details/index'
				})
			},
			saveChanges(){
				
			},
			logOut(){
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			
			
		}
	}
</script>

<style>
	@import 'index.scss';
</style>