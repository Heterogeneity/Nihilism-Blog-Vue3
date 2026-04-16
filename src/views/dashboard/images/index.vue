<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {type Image, imageDelete, type ImageDeleteRequest, imageList, type ImageListRequest} from "@/api/image.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {Delete, Search} from "@element-plus/icons-vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";

const categoryOptions = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '未使用',
    label: '未使用',
  },
  {
    value: '系统',
    label: '系统',
  },
  {
    value: '背景',
    label: '背景',
  },
  {
    value: '封面',
    label: '封面',
  },
  {
    value: '插图',
    label: '插图',
  },
  {
    value: '中转站',
    label: '中转站',
  },
  {
    value: '友链',
    label: '友链',
  },
  {
    value: '头像',
    label: '头像',
  },
]
const storageOptions = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '本地',
    label: '本地',
  },
  {
    value: '七牛云',
    label: '七牛云',
  },
]
const multipleImageTableRef = ref()
const imageTableData = ref<Image[]>()
const page = ref(1)
const page_size = ref(10)
const total = ref(0)
const imageBulkDeleteVisible = ref(false)
const imageListRequest = reactive<ImageListRequest>({
  name: null,
  category: null,
  storage: null,
  page: 1,
  page_size: 10
})
let idsToDelete: number[]
let imageInfo: Image
const imageDeleteVisible = ref(false)
const selectTable = (row: Image) => row.category === '未使用'

const layoutStore = useLayoutStore()
const route = useRoute()
const router = useRouter()

const handleIdsToDelete = () => {
  idsToDelete = []
  const rows: Image[] = multipleImageTableRef.value.getSelectionRows()
  rows.forEach((row) => {
    idsToDelete.push(row.id)
  })
}
const handleBulkDelete = async (ids: number[]) => {
  const requestData: ImageDeleteRequest = {
    ids: ids
  }
  const res = await imageDelete(requestData)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  }
  imageBulkDeleteVisible.value = false
  layoutStore.state.shouldRefreshImageTable = true
}
const getImageTableData = async () => {
  if (imageListRequest.name === "") {
    imageListRequest.name = null
  }
  if (imageListRequest.category === "") {
    imageListRequest.category = null
  }
  if (imageListRequest.storage === "") {
    imageListRequest.storage = null
  }

  imageListRequest.page = page.value
  imageListRequest.page_size = page_size.value
  const table = await imageList(imageListRequest)

  if (table.code === 0) {
    imageTableData.value = table.data.list
    total.value = table.data.total
    ElMessage.success(table.msg)
  } else {
    ElMessage.error(table.msg)
  }
}
const handleDelete = async (id: number) => {
  let ids: number[] = []
  ids.push(id)
  const requestData: ImageDeleteRequest = {
    ids: ids
  }
  const res = await imageDelete(requestData)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  }
  imageDeleteVisible.value = false
  layoutStore.state.shouldRefreshImageTable = true
  await getImageTableData()
}
const handleSizeChange = (val: number) => {
  page_size.value = val
  getImageTableData()
}
const handleCurrentChange = (val: number) => {
  page.value = val
  getImageTableData()
}

onMounted(() => {
  getImageTableData()
})
</script>

<template>
  <div class="image-list">
    <Title title="图片列表"/>
    <el-button-group>
      <el-dialog
          v-model="imageBulkDeleteVisible"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除图片
        </template>
        您已选中 [{{ idsToDelete.length }}] 项资源，删除后将无法恢复，是否确认删除？
        <template #footer>
          <el-button type="primary" @click="handleBulkDelete(idsToDelete)">
            确定
          </el-button>
          <el-button @click="imageBulkDeleteVisible = false">取消</el-button>
        </template>
      </el-dialog>
    </el-button-group>
    <div class="image-list-request">
      <el-form :inline="true" :model="imageListRequest">
        <el-form-item>
          <Button title="批量删除" @ToClick="imageBulkDeleteVisible = true;handleIdsToDelete()">
            <template #icon>
              <el-icon>
                <Delete/>
              </el-icon>
            </template>
          </Button>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-input v-model="imageListRequest.name" placeholder="请输入图片名称" clearable/>
        </el-form-item>
        <el-form-item label="图片类别">
          <el-select
              v-model="imageListRequest.category"
              placeholder="请选择"
              style="width: 200px"
          >
            <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="存储类型">
          <el-select
              v-model="imageListRequest.storage"
              placeholder="请选择"
              style="width: 200px"
          >
            <el-option
                v-for="item in storageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <Button title="查询" @ToClick="getImageTableData">
            <template #icon>
              <el-icon>
                <Search/>
              </el-icon>
            </template>
          </Button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
        align="center"
        ref="multipleImageTableRef"
        :data="imageTableData"
    >
      <el-table-column type="selection" :selectable="selectTable" width="60"/>
      <el-table-column label="图片" width="60">
        <template #default="scope:{ row: Image, column: any, $index: number }">
          <el-image :src="scope.row.url" alt=""/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="410"/>
      <el-table-column prop="url" label="路径(后端)" width="550"/>
      <el-table-column prop="category" label="类别" width="90"/>
      <el-table-column prop="storage" label="存储" width="90"/>
      <el-table-column label="操作">
        <template #default="scope:{ row: Image, column: any, $index: number }">
          <el-button
              v-if="scope.row.category==='未使用'"
              type="danger"
              @click="imageDeleteVisible=true;imageInfo=scope.row"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        v-model="imageDeleteVisible"
        width="500"
        center
        destroy-on-close
    >
      <template #header>
        删除图片
      </template>
      您已选中 [1] 项资源，删除后将无法恢复，是否确认删除？
      <template #footer>
        <el-button type="primary" @click="handleDelete(imageInfo.id)">
          确定
        </el-button>
        <el-button @click="imageDeleteVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <el-pagination
        popper-class="pagination-container"
        :current-page="page"
        :page-size="page_size"
        :page-sizes="[10,30,50,100]"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped lang="scss">
.image-list {
  padding: 20px;
  font-weight: bold;

  .el-button-group {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;

    .el-button {
      margin-left: 32px;
    }
  }
}

.image-list-request {
  display: flex;
  justify-content: space-between;
  border-radius: 20px;

  .image-button {
    width: 100px;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--main-color);
    color: var(--main-color);
    background-color: transparent;
    font-weight: bold;
    font-family: 'YSHST', fangsong;
    transition: all .5s ease;

    span {
      margin-left: 5px;
    }

    &:hover {
      color: var(--select-text-color);
      background-color: var(--main-color);
    }
  }
}

.el-table {
  font-size: .9rem;
  width: 100%;

  .el-image {
    height: 28px;
  }
}

.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.el-pagination__total) {
    color: var(--main-color);
    font-weight: bold;
  }

  :deep(.el-pagination__goto) {
    color: var(--main-color);
    font-weight: bold;
  }
}

</style>