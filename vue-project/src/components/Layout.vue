<template>
    <div class="common-layout" style="height: 100vh;">
        <el-container style="height: 100vh;">
            <el-aside class="aside_menu_wrap" width="200px">
                <Menu />
            </el-aside>
            <div class="page_main">
                <div class="page_main_content">
                    <RouterView  #default="{ Component ,route}">
                            <component :is="Component"/>
                    </RouterView>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
</script>

<style scoped lang="less">
.aside_menu_wrap {
    border-right: 1px solid #eee;
    background: #ffffff;
}
.page_main{
    flex:1;
    padding-left: 16px;
}
.page_main_content{
    background: #ffffff;
    padding: 20px;
    height: 100%;
}
</style>