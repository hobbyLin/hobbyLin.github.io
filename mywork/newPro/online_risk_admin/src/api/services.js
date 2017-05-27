/**
* Created by EX_WLJR_YANLIHUI on 2017/05/03
* 封装接口
**/

import urls from './urls';
import myUtils from '../utils/myUtils';

export default {
	//查询列表
	querySettingList(options = {}){
		return new Promise((resolve, reject) => {
			myUtils.http.request({
				method: 'POST',
				url: urls.querySettingList,
				qs: options
			}, (data) => {
				if (data.responseCode == '000000' || data.code == '000000') {
					resolve(data.data);
				} else {
					reject();
				}
			})
		})
	},
	//新增列表
	addSetting(options = {}){
		return new Promise((resolve, reject) => {
			myUtils.http.request({
				method: 'POST',
				url: urls.addSetting,
				qs: options
			}, (data) => {
				if (data.responseCode == '000000' || data.code == '000000') {
					resolve(data.data);
				} else {
					reject();
				}
			})
		})
	},
	//修改列表
	updateSetting(options = {}){
		return new Promise((resolve, reject) => {
			myUtils.http.request({
				method: 'POST',
				url: urls.updateSetting,
				qs: options
			}, (data) => {
				if (data.responseCode == '000000' || data.code == '000000') {
					resolve(data.data);
				} else {
					reject();
				}
			})
		})
	},
	//查询方案详情
	querySetting(options = {}){
		return new Promise((resolve, reject) => {
			myUtils.http.request({
				method: 'POST',
				url: urls.querySetting,
				qs: options
			}, (data) => {
				if (data.responseCode == '000000' || data.code == '000000') {
					resolve(data.data);
				} else {
					reject();
				}
			})
		})
	}
}