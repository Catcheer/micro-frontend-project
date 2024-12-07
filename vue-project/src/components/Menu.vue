<template>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :router="true">

        
        <GetMenuList :menuList="menuList" />

    </el-menu>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';


import { useRoute } from 'vue-router'
//ts-ignore
import useMenu from '@/hooks/useMenu'

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


const GetMenuList = (props:any) => {
    console.log('props------', props)
    return props.menuList.map((item:any) => {
        return getMenuItem(item)
    })
}


</script>


<style lang="less" scoped>
.el-menu-vertical-demo {
    border: none;
}
</style>