<template>
	<view class="page">
		<view class="header-box">
			<image
				class="avatar-img"
				src="" 
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
</template>

<script>
	export default {
		data() {
			return {
				userName: '用户名称',
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import 'index.scss';
</style>
