import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSetting = defineStore('setting', () => {
 
    let  navTopHight = ref(0)
   let isSubApp = ref(false)
 
  function setNavHeight (num:number){
    navTopHight.value = num
  }
  function setIsSubApp (flag:boolean){
    isSubApp.value = flag
  }

  return { isSubApp ,navTopHight,setNavHeight,setIsSubApp}
})
