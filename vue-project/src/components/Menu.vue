<template>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :router="true">

        <!-- <el-menu-item index="/">
            <template #title>
                <el-icon>
                    <House />
                </el-icon>
                <span>首页</span>
            </template>
</el-menu-item>
<el-sub-menu index="/sys">
    <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>系统管理</span>
            </template>
    <el-menu-item index="/sys/MenuManagement"><span>菜单管理</span></el-menu-item>
    <el-menu-item index="/sys/DicManagement"><span>字典管理</span></el-menu-item>
    <el-menu-item index="/sys/LogManagement"><span>日志管理</span></el-menu-item>
</el-sub-menu>
<el-menu-item index="/about">
    <template #title>
                <el-icon>
                    <document />
                </el-icon>
                <span>关于我们</span>
            </template>
</el-menu-item> -->
        <GetMenuList :menuList="menuList" />

    </el-menu>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';


import { useRoute } from 'vue-router'

import useMenu from '@/hooks/useMenu.js'

const { menuList } = useMenu()
console.log(menuList)


const route = useRoute()

const defaultActive = ref(route.path)


const getMenuItem = (item: any) => {
    if (item.children) {
        return h(ElSubMenu, {
            index: item.path
        },
            {
                title: () => [item.icon && h(ElIcon, { size: 20 }, [h(resolveComponent(item.icon))]), h('span', {}, item.title)],
                default: () => item.children.map(getMenuItem)
            }
        )
    } else {

        return h(ElMenuItem, {
            index: item.path
        }, {
            title: () => [item.icon && h(ElIcon, { size: 20 }, [h(resolveComponent(item.icon))]),
            h('span', {}, item.title)],
        })
    }



}


const GetMenuList = (props) => {
    console.log('props------', props)
    return props.menuList.map(item => {
        return getMenuItem(item)
    })
}


</script>


<style lang="less" scoped>
.el-menu-vertical-demo {
    border: none;
}
</style>