<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
            <el-menu-item index="review">配置审核</el-menu-item>
            <el-menu-item index="configureList">配置管理</el-menu-item>
            <el-menu-item index="test">test(测试代码标签)</el-menu-item>
        </el-menu>
        <div style="margin-top:20px;"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: 'review',
        };
    },
    created() {
        let nowTab = this.$route.fullPath;
        if(nowTab == "/configureList"){
            this.activeIndex = 'configureList';
        } else if(nowTab == "/review") {
            this.activeIndex = 'review';
        } else {
            this.activeIndex = 'test';
        }
    },
    methods: {
        handleSelect(key, keyPath) {
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../assets/styles/variables";
</style>
