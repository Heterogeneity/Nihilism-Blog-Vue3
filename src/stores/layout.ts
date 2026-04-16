import {forgotPassword} from "@/api/user";
import {defineStore} from "pinia";
import {ref, watch} from "vue";

function initState() {
    const savedIsCollapse = localStorage.getItem('isCollapse')
    return {
        isCollapse: savedIsCollapse === 'true',
        mainPanel: "main",
        popoverVisible: false,

        swiper:true,

        passwordResetVisible: false,
        shouldRefreshUserTable: false,
        shouldRefreshImageTable: false,

        articleCreateVisible: false,
        articleUpdateVisible: false,
        isSnowShow:true
    }
}

export const useLayoutStore = defineStore('layout', () => {
    const state = ref(initState())
    watch(() => state.value.isCollapse, (newIsCollapse) => {
        localStorage.setItem('isCollapse', String(newIsCollapse))
    })
    return {state}
})