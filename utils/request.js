// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2024 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import {
	toLogin,
	checkLogin
} from '../libs/login';

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}) {
	let Url = 'https://bz.wuht.net',
		header = {
			'content-type': 'application/json',
			//#ifdef H5
			'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
			//#endif
			//#ifdef MP
			'Form-type': 'routine',
			//#endif
			//#ifdef APP-VUE
			'Form-type': 'app',
			//#endif
		};

	if (!noAuth) {
		//登录过期自动登录
		if (data.token && !checkLogin()) {
			console.log('未登录');
			toLogin();
			return Promise.reject({
				msg: `未登录`
			});
		}
	}
	if (data.token) {
		header['Authori-zation'] = 'Bearer ' + data.token;
	}

	return new Promise((reslove, reject) => {
		if (uni.getStorageSync('locale')) {
			header['Cb-lang'] = uni.getStorageSync('locale')
		}
		uni.request({
			url: Url + '/api/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			timeout: 10000,
			success: (res) => {
				if (noVerify) {
					reslove(res.data, res);
				}
					
				else if (res.data.status == 200) {
					reslove(res.data, res);
				}
					
				else if ([110002, 110003, 110004].indexOf(res.data.status) !== -1) {
					toLogin();
					reject(res.data);
				} else if (res.data.status == 100103) {
					uni.showModal({
						title: `提示`,
						content: res.data.msg,
						showCancel: false,
						confirmText: `我知道了`
					});
				} else
					reject(res.data.msg || `系统错误`);
				console.log(res.data);
			},
			fail: (msg) => {
				let data = {
					mag: `请求失败`,
					status: 1 //1没网
				}
				// #ifdef APP-PLUS
				reject(data);
				// #endif
				// #ifndef APP-PLUS
				reject(`请求失败`);
				// #endif
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;