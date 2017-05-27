<template>
    <div>
        <el-button type="primary" @click="addScheme">新增配置</el-button>
        <el-table :data="tableData" border style="width: 100%;margin-top: 20px;">
            <el-table-column prop="settingName" label="配置名称" width="120">
            </el-table-column>
            <el-table-column prop="settingKey" label="设置项" width="120">
            </el-table-column>
            <el-table-column prop="settingValue" label="配置项" width="120">
            </el-table-column>
            <el-table-column prop="remark" label="配置说明" width="120">
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="120">
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期" :formatter="changeTime" width="150">
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
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">配置更改</el-button>
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
import filters from '../../filters/filters';
export default {
    data() {
        return {
            tableData: [],
            total: 1
        }
    },
    created(){
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
        //跳转到新增方案
        addScheme(){
            this.$router.push('/detail/new');
        }, 
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
        //过滤状态
        changeState(state){
            state = state.state;
            state = state == '0' ? '待审核' : '审核通过';
            return state;
        },
        //查看方案详情
        handleView(index, row){
            this.$router.push(`/detail/view?id=${row.settingId}`);
        },
        //进入方案编辑
        handleEdit(index, row){
        	this.$router.push(`/detail/update?id=${row.settingId}`);
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/styles/variables";
</style>