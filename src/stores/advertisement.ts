import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import type {ApiResponse} from "@/utils/axios.ts";
import type {ImageUploadResponse} from "@/api/image.ts";
import type {
    Advertisement,
    AdvertisementCreateRequest, AdvertisementDeleteRequest,
    AdvertisementListRequest,
    AdvertisementUpdateRequest
} from "@/api/advertisement.ts";
import {advertisementCreate, advertisementDelete, advertisementList, advertisementUpdate} from "@/api/advertisement.ts";

export const useAdvertisementStore = defineStore('advertisement', () => {
    const state = ref(
        {
            page: 1,
            page_size: 10,
            total: 0,
            created: false,
            deleted: false,
            updated: false,
        }
    )
    const advertisementData = ref<Advertisement[]>()
    const tableRef = ref()
    const advertisementListRequest = reactive<AdvertisementListRequest>({
        title: null,
        content: null,
        page: 1,
        page_size: 10
    })
    const advertisementCreateData = reactive<AdvertisementCreateRequest>({
        ad_image: "",
        link: "",
        title: "",
        content: ""
    })
    const advertisementUpdateData = reactive<AdvertisementUpdateRequest>({
        id: 0,
        link: "",
        title: "",
        content: ""
    })

    let ids: any[] = []
    const path = ref(import.meta.env.VITE_BASE_API)

    //selectIds 选中删除
    const selectIds = () => {
        state.value.deleted = true
    }

    //isCheck 是否选中
    const isCheck = (item: Advertisement, e: any) => {
        if (e.target.checked || ids.indexOf(item.id) === -1) {
            ids.push(item.id)
        } else {
            ids.splice(ids.indexOf(item.id), 1)
        }
    }

    //uploadImage 图片上传
    const uploadImage = (res: ApiResponse<ImageUploadResponse>) => {
        if (res.code === 0) {
            advertisementCreateData.ad_image = res.data.url
            ElMessage.success(res.msg)
        }
    }

    //getSingle 获取单个
    const getSingle = (item: Advertisement) => {
        state.value.updated = true
        advertisementUpdateData.id = item.id
        advertisementUpdateData.link = item.link
        advertisementUpdateData.title = item.title
        advertisementUpdateData.content = item.content
    }

    // updateAdvertisement 更新
    const updateAdvertisement = async () => {
        const res = await advertisementUpdate(advertisementUpdateData)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            state.value.updated = false
            await getAdvertisementList()
        } else {
            ElMessage.error(res.msg)
        }
    }

    //createAdvertisement 创建
    const createAdvertisement = async () => {
        const res = await advertisementCreate(advertisementCreateData)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            state.value.created = false
            advertisementCreateData.ad_image = ""
            advertisementCreateData.link = ""
            advertisementCreateData.title = ""
            advertisementCreateData.content = ""
            await getAdvertisementList()
        } else {
            ElMessage.error(res.msg)
        }
    }

    //deleteSingle 删除单个
    const deleteSingle = async (item: Advertisement) => {
        ids.push(item.id)
        await deleteAdvertisement()
        await getAdvertisementList()
    }

    //deleteAdvertisement 删除
    const deleteAdvertisement = async () => {
        const request: AdvertisementDeleteRequest = {
            ids: ids
        }
        const res = await advertisementDelete(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
        }
        ids = []
        state.value.deleted = false
        await getAdvertisementList()
    }

    //getAdvertisementList 获取列表
    const getAdvertisementList = async () => {
        if (advertisementListRequest.title === "") {
            advertisementListRequest.title = null
        }
        if (advertisementListRequest.content === "") {
            advertisementListRequest.content = null
        }
        advertisementListRequest.page = state.value.page
        advertisementListRequest.page_size = state.value.page_size
        const table = await advertisementList(advertisementListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            advertisementData.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }


    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getAdvertisementList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getAdvertisementList().then()
    }
    return {
        ids,
        path,
        state,
        advertisementData,
        tableRef,
        advertisementCreateData,
        advertisementUpdateData,
        advertisementListRequest,
        isCheck,
        selectIds,
        getSingle,
        deleteSingle,
        createAdvertisement,
        updateAdvertisement,
        deleteAdvertisement,
        getAdvertisementList,
        uploadImage,
        handleSizeChange,
        handleCurrentChange
    }
})