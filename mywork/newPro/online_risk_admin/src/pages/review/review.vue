<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="settingName" label="配置名称" width="120" >
                </el-table-column>
                <el-table-column prop="settingValue" label="配置项" width="120">
                </el-table-column>
                <el-table-column prop="settingKey" label="设置项" width="120">
                </el-table-column>
                <el-table-column prop="remark" label="配置说明" width="120">
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" width="120">
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期" :formatter="changeTime"  width="150">
                </el-table-column>
                <el-table-column prop="updateDate" label="更新日期" :formatter="changeTime1" width="150">
                </el-table-column>
                <el-table-column prop="state" label="组合状态" :formatter="changeState" width="120">
                </el-table-column>
            <el-table-column label="组合" width="120">
                <template scope="scope">
                    <el-button size="small" @click="handleView(scope.$index, scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                    <el-button size="small" type="danger" @click="handleCancel(scope.$index, scope.row)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="total" :page-size="5" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import services from '../../api/services';
export default {
    data() {
            return {
                tableData: [],
                total: 1
            }
        },
    created(){
        //请求列表
        services.querySettingList({
            pageSize: 5,
            pageNum: 1
        }).then((data) => {
            this.tableData = data.dataList;
            this.total = parseInt(data.totalRows);
        }, (error) => {

        })
    },
    methods: {
        //将毫秒数转成时间
        changeTime(time){
            time = time.createDate;
            let day = new Date(time);
            let year = day.getFullYear();
            let month = day.getMonth() + 1;
            let dayC = day.getDay()
            let hours = day.getHours();
            let minutes = day.getMinutes();
            let fullDay = `${year}-${month}-${dayC} ${hours}:${minutes}`;
            return fullDay;
        },
        //将毫秒数转成时间
        changeTime1(time){
            time = time.updateDate;
            let day = new Date(time);
            let year = day.getFullYear();
            let month = day.getMonth() + 1;
            let dayC = day.getDay()
            let hours = day.getHours();
            let minutes = day.getMinutes();
            let fullDay = `${year}-${month}-${dayC} ${hours}:${minutes}`;
            return fullDay;
        },
        //过滤一下配置状态
        changeState(state){
            state = state.state;
            state = state == '0' ? '待审核' : '审核通过';
            return state;
        },
        //查看方案详情
        handleView(index, row){
            this.$router.push(`/detail/view?id=${row.settingId}`);
        },
        //分页
        handleCurrentChange(pageNum){
            services.querySettingList({
                pageSize: 5,
                pageNum,
            }).then((data) => {
                this.tableData = data.dataList;
            }, (error) => {

            })
        },
        //同意配置
        handleAgree(index, row) {
            if(row.state == '1'){
                this.$notify({
                    title: '温馨提示',
                    message: '你已同意该配置，无需再做同意操作！',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('是否同意此配置?', '温馨提示', {
                confirmButtonText: '同意',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    settingName: row.settingName,
                    state: 1,
                    settingKey: row.settingKey,
                    settingValue: row.settingValue,
                    remark: row.remark,
                    settingId: row.settingId
                }
                services.updateSetting({
                    ...params
                }).then((data) => {
                    this.tableData[index].state = '1';
                }, (error) => {

                })
            }).catch(() => {         
            });
        },
        //拒绝配置
        handleCancel(index, row) {
            if(row.state == '0'){
                this.$notify({
                    title: '温馨提示',
                    message: '你已拒绝该配置，无需再做拒绝操作！',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('是否取消此配置?', '温馨提示', {
                confirmButtonText: '确定取消',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    settingName: row.settingName,
                    state: 0,
                    settingKey: row.settingKey,
                    settingValue: row.settingValue,
                    remark: row.remark,
                    settingId: row.settingId
                }
                services.updateSetting({
                    ...params
                }).then((data) => {
                    this.tableData[index].state = '0';
                }, (error) => {

                })
            }).catch(() => {         
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/styles/variables";
</style>