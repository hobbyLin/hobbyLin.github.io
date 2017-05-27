/**
* Created by EX_WLJR_YANLIHUI on 2017/05/03
* 各种过滤器
**/

export default {
	//根据毫秒数获取时间
	changeTime(time){
		let day = new Date(time);
		let year = day.getFullYear();
		let month = day.getMonth() + 1;
		let dayC = day.getDay()
		let hours = day.getHours();
		let minutes = day.getMinutes();
		let second = day.getSeconds();
		let fullDay = `${year} - ${month} - ${dayC} ${hours} - ${minutes} - ${second}`;
		return fullDay;
	}
}