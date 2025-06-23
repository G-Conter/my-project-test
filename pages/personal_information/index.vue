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
							:src="avatarUrl" 
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
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				name: '',
				idNumber: '',
				avatarUrl: '',
			}
		},
		onLoad() {
			console.log("进入个人资料页面")
			try {
				const tokenValue = uni.getStorageSync('token');
				if (tokenValue) {
					const data = {
						'token': tokenValue,
					}
					// console.log(request.get('user', data, {noAuth: true, noVerify: false})) 
					const cast = request.get('user', data, {noAuth: true, noVerify: false});
					cast.then((res) => {
						const resData = res.data;
						console.log(resData);
						this.name = resData.real_name;
						this.idNumber = resData.agent_id;
						this.avatarUrl = resData.avatar;
					})
				}
				
			} catch (e) {
				// error
			}
			// data = {
			// 	'token': tokenValue,
			// }
			
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