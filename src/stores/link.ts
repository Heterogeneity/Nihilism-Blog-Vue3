import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {
    type FriendLink, friendLinkCreate, type FriendLinkCreateRequest,
    friendLinkDelete,
    type FriendLinkDeleteRequest,
    friendLinkList,
    type FriendLinkListRequest, friendLinkUpdate, type FriendLinkUpdateRequest
} from "@/api/friend_link.ts";
import {ElMessage} from "element-plus";
import type {ApiResponse} from "@/utils/axios.ts";
import type {ImageUploadResponse} from "@/api/image.ts";

export const useLinkStore = defineStore('link', () => {
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
    const linkData = ref<FriendLink[]>()
    const tableRef = ref()
    const linkListRequest = reactive<FriendLinkListRequest>({
        name: null,
        description: null,
        page: 1,
        page_size: 10
    })
    const linkCreateData = reactive<FriendLinkCreateRequest>({
        logo: "",
        link: "",
        name: "",
        description: ""
    })
    const linkUpdateData = reactive<FriendLinkUpdateRequest>({
        id: 0,
        link: "",
        name: "",
        description: "",
    })

    let ids: any[] = []
    const path = ref(import.meta.env.VITE_BASE_API)

    //selectIds 选中删除
    const selectIds = () => {
        state.value.deleted = true
    }

    //isCheck 是否选中
    const isCheck = (item: FriendLink, e: any) => {
        if (e.target.checked) {
            ids.push(item.id)
        } else {
            ids.splice(ids.indexOf(item.id), 1)
        }
    }

    //uploadImage 图片上传
    const uploadImage = (res: ApiResponse<ImageUploadResponse>) => {
        if (res.code === 0) {
            linkCreateData.logo = res.data.url
            ElMessage.success(res.msg)
        }
    }

    //getSingle 获取单个
    const getSingle = (item: FriendLink) => {
        state.value.updated = true
        linkUpdateData.id = item.id
        linkUpdateData.link = item.link
        linkUpdateData.name = item.name
        linkUpdateData.description = item.description
    }

    // updateLink 更新
    const updateLink = async () => {
        const res = await friendLinkUpdate(linkUpdateData)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            state.value.updated = false
            await getLinkList()
        } else {
            ElMessage.error(res.msg)
        }
    }

    //createLink 创建
    const createLink = async () => {
        const res = await friendLinkCreate(linkCreateData)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            state.value.created = false
            linkCreateData.logo = ""
            linkCreateData.link = ""
            linkCreateData.name = ""
            linkCreateData.description = ""
            await getLinkList()
        } else {
            ElMessage.error(res.msg)
        }
    }

    //deleteSingle 删除单个
    const deleteSingle = async (item: FriendLink) => {
        ids.push(item.id)
        await deleteLink()
        await getLinkList()
    }

    //deleteLink 删除
    const deleteLink = async () => {
        const request: FriendLinkDeleteRequest = {
            ids: ids
        }
        const res = await friendLinkDelete(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            ids = []
        }
        state.value.deleted = false
        await getLinkList()
    }

    //getLinkList 获取列表
    const getLinkList = async () => {
        if (linkListRequest.name === "") {
            linkListRequest.name = null
        }
        if (linkListRequest.description === "") {
            linkListRequest.description = null
        }
        linkListRequest.page = state.value.page
        linkListRequest.page_size = state.value.page_size
        const table = await friendLinkList(linkListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            linkData.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }


    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getLinkList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getLinkList().then()
    }
    return {
        ids,
        path,
        state,
        linkData,
        tableRef,
        linkCreateData,
        linkUpdateData,
        linkListRequest,
        isCheck,
        selectIds,
        getSingle,
        deleteSingle,
        createLink,
        updateLink,
        deleteLink,
        getLinkList,
        uploadImage,
        handleSizeChange,
        handleCurrentChange
    }
})