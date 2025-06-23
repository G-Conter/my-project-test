<template>
	<view class="page-pop">
		<UserCancel class="user-cancel-box">
			<view class="top-box">
				<!-- <view class="img-box">
					<view class="img-content-box">
						<view class="icon-background-box">
							<view class="icon-box">
								<i class="iconfont message-icon">&#xe615;</i>
							</view>
						</view>
					</view>
				</view> -->
				<image 
					class="background-image"
					src="../../static/address.png" 
					mode=""></image>
			</view>
			<view class="cancellation-box">
				<view class="cancellation-title-box">
					<text class="cancellation-title-text">是否确认注销</text>
				</view>
				<view class="cancellation-content-box">
					<text class="cancellation-content-text">注销后无法恢复，请谨慎操作</text>
				</view>
				<view class="btn-box">
					<view 
						class="cancellation-btn"
						@click="cancellation()">
						<text class="cancellation-btn-text">注销</text>
					</view>
					<view 
						class="cancellation-cancel-btn" 
						@click="sendCancel">
						<text class="cancellation-cancel-btn-text">取消</text>
					</view>
				</view>
			</view>
		</UserCancel>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			sendCancel: function () {
				this.$emit("send", false)
			},
			cancellation() {
				try {
					const tokenValue = uni.getStorageSync('token');
					if (tokenValue) {
						const data = {
							'token': tokenValue,
						}
						// console.log(request.get('user', data, {noAuth: true, noVerify: false})) 
						const cast = request.get('user_cancel', data, {noAuth: true, noVerify: false});
						cast.then((res) => {
							const resData = res.data;
							console.log(resData);
						})
					}
					
				} catch (e) {
					// error
				}
			}
		}
	}
</script>

<style>
	@import 'user-cancel.scss';
</style>