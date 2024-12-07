<script setup lang="ts">
import  { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter'
import {useSetting} from '@/stores/setting'



let {count,doubleCount}  = storeToRefs(useCounterStore())
let {increment}=useCounterStore()

let {navTopHight,isSubApp} = storeToRefs(useSetting())
let {setNavHeight} = useSetting()



</script>

<template>
  <main>
   <div>
    我是vue项目首页
   </div>
   <div>
      <div>我是本地数据 <span :style="{fontSize:'22px'}">{{ count }}</span></div>
      <div>我是计算属性 <span :style="{fontSize:'22px'}">{{ doubleCount }}</span></div>
      <el-button type="primary" @click="increment">+1</el-button>
   </div>
   <div v-if="isSubApp">
    <div>我是一些来自父应用的数据</div>
       navTopHight:  <span :style="{fontSize:'22px'}">{{ navTopHight }}</span>
       <div></div>
       <el-button type="primary" @click="setNavHeight(navTopHight+1)">+1</el-button>
   </div>
  </main>
</template>
