/* 
 * 格式化为定义的数字值
 * val
 * undefined(--)
 */

import RiskImg1 from '../assets/images/pictures/risk-04.png';
import RiskImg2 from '../assets/images/pictures/risk-02.png';
import RiskImg3 from '../assets/images/pictures/risk-03.png';
import RiskImg4 from '../assets/images/pictures/risk-05.png';
import RiskImg5 from '../assets/images/pictures/risk-01.png';
import RiskImg6 from '../assets/images/pictures/risk-06.png';

export function numUn(val){
	return val ? val : '--';
}

//风险等级1
const RiskText1 = {
	'1': '保守型',
    '2': '稳健型',
    '3': '平衡型',
    '4': '成长型',
    '5': '进取型'
}

//风险等级2
const RiskText2 = {
	'1': '低',
    '2': '中低',
    '3': '中',
    '4': '中高',
    '5': '高'
}

//风险等级3
const RiskText3 = {
    '1': '<p>综合您的风险评估及资产状态，您属于<span class="user-type">保守型</span>用户，您适合投资于<b>保本为主的投资工具</b>，但您因此会牺牲资本升值的机会。</p><p>风险值表示您当前的风险承受能力。收益与风险相随，您的评估结果根据您评测问卷的主观结果得出，若对评估结果有异议，请重新进行风险测试。</p>',
    '2': '<p>综合您的风险评估及资产状态，您属于<span class="user-type">稳健型</span>用户，您适合投资于能够权衡保本而亦<b>有若干升值能力</b>的投资工具。</p><p>风险值表示您当前的风险承受能力。收益与风险相随，您的评估结果根据您主观评测问卷结果得出，若对评估结果有异议，请重新进行风险测试。</p>',
    '3': '<p>综合您的风险评估及资产状态，您属于<span class="user-type">平衡型</span>用户，您适合投资于能够为您提供<b>温和升值能力</b>，而投资价值有温和波动的投资工具。</p><p>风险值表示您当前的风险承受能力。收益与风险相随，您的评估结果根据您主观评测问卷结果得出，若对评估结果有异议，请重新进行风险测试。</p>',
    '4': '<p>综合您的风险评估及资产状态，您属于<span class="user-type">成长型</span>用户，您适合投资于能够为您提供<b>升值能力</b>，而投资价值有波动的投资工具。</p><p>风险值表示您当前的风险承受能力。收益与风险相随，您的评估结果根据您主观评测问卷结果得出，如若对评估结果有异议，请重新进行风险测试。</p>',
    '5': '<p>综合您的风险评估及资产状态，您属于<span class="user-type">进取型</span>用户，您适合投资于能够为您提供<b>高升值能力</b>，而投资价值波动大的投资工具，最坏情况下，您可能失去全部投资本金并需对您投资所导致的任何亏损承担责任。</p><p>风险值表示您当前的风险承受能力。收益与风险相随，您的评估结果根据您主观评测问卷结果得出，如若对评估结果有异议，请重新进行风险测试。</p>'
}

//风险等级对应图片
const RiskImg = {
    '1': RiskImg1,
    '2': RiskImg2,
    '3': RiskImg3,
    '4': RiskImg4,
    '5': RiskImg5,
    '6': RiskImg6
}

export function riskText1(val){
	return RiskText1[val] ? RiskText1[val]: val;
}

export function riskText2(val){
	return RiskText2[val] ? RiskText2[val]: val;
}

export function riskText3(val){
    return RiskText3[val] ? RiskText3[val]: val;
}

export function riskImg(val, status) {
    if(status == '3'){
        val = '6';
    }
    return RiskImg[val] ? RiskImg[val]: val;
}

/*
 * 格式化为xxx.xx
 */
export function numTT(val){
    if(val == null || val == "null"){
        return '--';
    }
    let ret = parseFloat(val, 10);

    if(isNaN(ret)) {
        return val;
    }

    return ret.toFixed(2);
}

/*
 * 格式化为xxx
 */
export function numT(val){
    if(val == null){
        return '--';
    }
    let ret = parseInt(val, 10);

    if(isNaN(ret)) {
        return val;
    }

    return ret;
}

/*
 * 获取数字的整数部分（1.11-1.），无（--）
 */
export function preNum(val){
    if(val == null){
        return '--';
    }

    return (val.split('.')[0] + '.');
}


/*
 * 获取数字的小数部分（1.11-11），无（--）
 */
export function sufNum(val){
    if(val == null){
        return '--';
    }

    return val.split('.')[1];
}




//--------------ylh
/**
 * 金额格式化
 * @s String 金额
 * @n Number 保留小数点后几位
 */
export function fmoney(s) {
    if(s == null) {
        return '--';
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    let l = s.split(".")[0].split("").reverse(),
        t = "";
    for(let i = 0; i < l.length; i ++ ) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
}
//--------------duhui
/**
 * 金额格式化
 * @s String 金额
 * @n Number 保留小数点后几位
 */
export function formatMoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(s)) {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
        let l = s.split(".")[0].split("").reverse(),
            t = "";
        for(let i = 0; i < l.length; i ++ ) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
    } else {
        return s;
    }
}