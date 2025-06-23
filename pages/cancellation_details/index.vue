<template>
	<view class="page">
		<view class="contents-box">
			<view class="header-box">
				<image
					class="avatar-img"
					:src="avatarUrl"  
					mode=""></image>
				<text class="user-name">{{userName}}</text>
			</view>
			<view class="contents-box">
				注销详情
			</view>
			<view class="cancellation-button-box">
				<text class="cancellation-remind">点击【申请注销】即代表您已经同意《用户注销协议》</text>
				<view 
					class="cancellation-button"
					@click="cancelAccount()">
					<text class="cancellation-button-text">立即注销</text>
				</view>
			</view>
			
		</view>
		<UserCancel 
			v-show="userCancelIsShow"
			@send="changeUserCancelIsShow">
		</UserCancel>
	</view>
</template>

<script>
	import request from '@/utils/request.js';
	import UserCancel from '@/components/UserCancel/UserCancel';
	export default {
		
		data() {
			return {
				userName: '',
				avatarUrl: '',
				userCancelIsShow: false,
			}
		},
		components: { UserCancel },
		onLoad() {
			console.log("进入注销详情界面");
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
						this.userName = resData.real_name;
						this.avatarUrl = resData.avatar;
					})
				}
				
			} catch (e) {
				// error
			}
		},
		methods: {
			cancelAccount() {
				this.userCancelIsShow = true;
			},
			changeUserCancelIsShow: function(res) {
				this.userCancelIsShow = res
			},
		}
	}
</script>

<style>
	@import 'index.scss';
</style>
