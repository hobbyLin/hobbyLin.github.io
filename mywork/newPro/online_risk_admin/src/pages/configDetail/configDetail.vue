<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" style="padding-left: 10px;">
            <el-button-group>
                <el-button type="text" icon="arrow-left" @click="back">返回</el-button>
            </el-button-group>
        </el-menu>
        <el-form ref="form" :model="form" label-width="100px" style="margin-top: 20px;">
            <el-form-item label="配置名称">
                <el-input v-model="form.settingName" :disabled="way=='view'"></el-input>
            </el-form-item>
            <el-form-item label="配置项">
                <el-input v-model="form.settingKey" :disabled="way !=='new'"></el-input>
            </el-form-item>
            <el-form-item>
            <p style="padding: 0 15px;color: #777;border-left: 4px solid #ddd;">提示：配置项为配置的key值，设置项为配置的value值，如果要想配置视频时间，请将配置项设为“workTime”</p>
            </el-form-item>
            <el-form-item label="远程视频时间" v-if="form.settingKey == 'workTime'">
                <el-form-item label="周一至周五">
                    <el-col :span="3">
                        <el-select v-model="dwStartH" placeholder="时" :disabled="way=='view'">
                            <el-option
                              v-for="item in hours"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;:&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="dwStartM" placeholder="分" :disabled="way=='view'">
                            <el-option
                              v-for="item in minutes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;—&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="dwEndH" placeholder="时" :disabled="way=='view'">
                            <el-option
                              v-for="item in hours"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;:&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="dwEndM" placeholder="分" :disabled="way=='view'">
                            <el-option
                              v-for="item in minutes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="周六至周日" style="margin-top: 10px;">

                <el-col :span="3">
                        <el-select v-model="weStartH" placeholder="时" :disabled="way=='view'">
                            <el-option
                              v-for="item in hours"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;:&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="weStartM" placeholder="分" :disabled="way=='view'">
                            <el-option
                              v-for="item in minutes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;—&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="weEndH" placeholder="时" :disabled="way=='view'">
                            <el-option
                              v-for="item in hours"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="1" style="color: #ccc">&nbsp;:&nbsp;</el-col>
                    <el-col :span="3">
                        <el-select v-model="weEndM" placeholder="分" :disabled="way=='view'">
                            <el-option
                              v-for="item in minutes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form-item>
            <el-form-item label="设置项" v-else>
                <el-input v-model="form.settingValue" :disabled="way=='view'"></el-input>
            </el-form-item>
            <el-form-item label="配置说明" style="margin-top: 10px;">
                <el-input type="textarea" :rows="2" placeholder="请输入配置说明" v-model="form.remark" :disabled="way=='view'" style="width: 80%;">
            </el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="way=='view'">立即配置</el-button>
                <el-button @click="cancel" :disabled="way=='view'">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import services from '../../api/services';
export default {
    data() {
            return {
                form: {
                    settingName: '',
                    settingKey: '',
                    settingValue: '',
                    remark: ''
                },
                hours: [{
                  value: '0',
                  label: '0'
                },{
                  value: '1',
                  label: '1'
                }, {
                  value: '2',
                  label: '2'
                }, {
                  value: '3',
                  label: '3'
                }, {
                  value: '4',
                  label: '4'
                }, {
                  value: '5',
                  label: '5'
                },{
                  value: '6',
                  label: '6'
                },{
                  value: '7',
                  label: '7'
                },{
                  value: '8',
                  label: '8'
                },{
                  value: '9',
                  label: '9'
                },{
                  value: '10',
                  label: '10'
                },{
                  value: '11',
                  label: '11'
                },{
                  value: '12',
                  label: '12'
                },{
                  value: '13',
                  label: '13'
                },{
                  value: '14',
                  label: '14'
                },{
                  value: '15',
                  label: '15'
                },{
                  value: '16',
                  label: '16'
                },{
                  value: '17',
                  label: '17'
                },{
                  value: '18',
                  label: '18'
                },{
                  value: '19',
                  label: '19'
                },{
                  value: '20',
                  label: '20'
                },{
                  value: '21',
                  label: '21'
                },{
                  value: '22',
                  label: '22'
                },{
                  value: '23',
                  label: '23'
                }],
            minutes: [{
                  value: '00',
                  label: '00'
                }, {
                  value: '01',
                  label: '01'
                }, {
                  value: '02',
                  label: '02'
                }, {
                  value: '03',
                  label: '03'
                }, {
                  value: '04',
                  label: '04'
                }, {
                  value: '05',
                  label: '05'
                },{
                  value: '06',
                  label: '06'
                },{
                  value: '07',
                  label: '07'
                },{
                  value: '08',
                  label: '08'
                },{
                  value: '09',
                  label: '09'
                },{
                  value: '10',
                  label: '10'
                },{
                  value: '11',
                  label: '11'
                },{
                  value: '12',
                  label: '12'
                },{
                  value: '13',
                  label: '13'
                },{
                  value: '14',
                  label: '14'
                },{
                  value: '15',
                  label: '15'
                },{
                  value: '16',
                  label: '16'
                },{
                  value: '17',
                  label: '17'
                },{
                  value: '18',
                  label: '18'
                },{
                  value: '19',
                  label: '19'
                },{
                  value: '20',
                  label: '20'
                },{
                  value: '21',
                  label: '21'
                },{
                  value: '22',
                  label: '22'
                },{
                  value: '23',
                  label: '23'
                },{
                  value: '24',
                  label: '24'
                },{
                  value: '25',
                  label: '25'
                },{
                  value: '26',
                  label: '26'
                },{
                  value: '27',
                  label: '27'
                },{
                  value: '28',
                  label: '28'
                },{
                  value: '29',
                  label: '29'
                },{
                  value: '30',
                  label: '30'
                },{
                  value: '31',
                  label: '31'
                },{
                  value: '32',
                  label: '32'
                },{
                  value: '33',
                  label: '33'
                },{
                  value: '34',
                  label: '34'
                },{
                  value: '35',
                  label: '35'
                },{
                  value: '36',
                  label: '36'
                },{
                  value: '37',
                  label: '37'
                },{
                  value: '38',
                  label: '38'
                },{
                  value: '39',
                  label: '39'
                },{
                  value: '40',
                  label: '40'
                },{
                  value: '41',
                  label: '41'
                },{
                  value: '42',
                  label: '42'
                },{
                  value: '43',
                  label: '43'
                },{
                  value: '44',
                  label: '44'
                },{
                  value: '45',
                  label: '45'
                },{
                  value: '46',
                  label: '46'
                },{
                  value: '47',
                  label: '47'
                },{
                  value: '48',
                  label: '48'
                },{
                  value: '49',
                  label: '49'
                },{
                  value: '50',
                  label: '50'
                },{
                  value: '51',
                  label: '51'
                },{
                  value: '52',
                  label: '52'
                },{
                  value: '53',
                  label: '53'
                },{
                  value: '54',
                  label: '54'
                },{
                  value: '55',
                  label: '55'
                },{
                  value: '56',
                  label: '56'
                },{
                  value: '57',
                  label: '57'
                },{
                  value: '58',
                  label: '58'
                },{
                  value: '59',
                  label: '59'
                }],
                value: '',
                dwStartH: '9',
                dwStartM: '',
                dwEndH: '',
                dwEndM: '',
                weStartH: '',
                weStartM: '',
                weEndH: '',
                weEndM: '',
                id: '',
                way: ''
            }
        },
        created(){
            this.way = this.$route.params.way;
            //new是新增 view是查看 update是更新
            if(this.way == 'new'){
                this.ableEdit = true;
            }else{
                this.id = this.$route.query.id;
                services.querySetting({
                    settingId: this.id
                }).then((data) => {
                  //如果配置的key是视频时间
                    if(data.settingKey == 'workTime'){
                        data.settingValue = JSON.parse(data.settingValue);
                        let dwStart = data.settingValue.dwStart.split(':');
                        let dwEnd = data.settingValue.dwEnd.split(':');
                        let weStart = data.settingValue.weStart.split(':');
                        let weEnd = data.settingValue.weEnd.split(':');
                        this.dwStartH = dwStart[0];
                        this.dwStartM = dwStart[1];
                        this.dwEndH = dwEnd[0];
                        this.dwEndM = dwEnd[1];
                        this.weStartH = weStart[0];
                        this.weStartM = weStart[1];
                        this.weEndH = weEnd[0];
                        this.weEndM = weEnd[1];
                    }
                    this.form = data;
                }, (error) => {
                    //错误处理
                })
            }
        },
        methods: {
            onSubmit() {
                let settingValue;
                if(this.form.settingKey == 'workTime'){
                    settingValue = {
                        "dwStart": `${this.dwStartH}:${this.dwStartM}`,
                        "dwEnd": `${this.dwEndH}:${this.dwEndM}`,
                        "weStart": `${this.weStartH}:${this.weStartM}`,
                        "weEnd": `${this.weEndH}:${this.weEndM}`
                    }
                    settingValue = JSON.stringify(settingValue);
                }else{
                    settingValue = this.form.settingValue;
                }
                //如果是更新订单
                if(this.way == 'update'){
                    services.updateSetting({
                        settingName: this.form.settingName,
                        state: 0,
                        settingKey: this.form.settingKey,
                        settingValue,
                        remark: this.form.remark,
                        settingId: this.id
                    }).then((data) => {
                        this.$router.replace('/configureList');
                    }, (error) => {
                        //错误处理
                    })
                //如果是新增方案
                }else{
                    services.addSetting({
                        settingName: this.form.name,
                        state: 0,
                        settingKey: this.form.settingKey,
                        settingValue,
                        remark: this.form.remark
                    }).then((data) => {
                        this.$router.replace('/configureList');
                    }, (error) => {
                        //错误处理
                    })
                }
            },
            back() {
                this.$router.go(-1);
            },
            cancel(){
                this.$router.go(-1);
            }
        }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/styles/variables";
</style>
