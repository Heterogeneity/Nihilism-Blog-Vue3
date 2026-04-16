<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Check, Close, Delete, Document, DocumentAdd, FolderAdd, Search, Select} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useAdvertisementStore} from "@/stores/advertisement.ts";
import {useUserStore} from "@/stores/user.ts";

const advertisementStore = useAdvertisementStore()
const userStore = useUserStore()

onMounted(() => {
  advertisementStore.getAdvertisementList()
})
</script>

<template>
  <div class="advertisement-main">
    <Title title="中转站列表"/>
    <div class="advertisement-header">
      <input name="title" class="advertisement-header-input" type="text"
             v-model="advertisementStore.advertisementListRequest.title"
             placeholder="请输入中转站名称">
      <input name="content" class="advertisement-header-input" type="text"
             v-model="advertisementStore.advertisementListRequest.content"
             placeholder="请输入中转站描述">
      <Button title="查询" @ToClick="advertisementStore.getAdvertisementList">
        <template #icon>
          <el-icon>
            <Search/>
          </el-icon>
        </template>
      </Button>
      <Button title="添加中转站" @ToClick="advertisementStore.state.created=true">
        <template #icon>
          <el-icon>
            <FolderAdd/>
          </el-icon>
        </template>
      </Button>
      <Button title="批量删除" @ToClick="advertisementStore.selectIds">
        <template #icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </template>
      </Button>
      <el-dialog
          v-model="advertisementStore.state.deleted"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除
        </template>
        <div>
          您已选中【{{ advertisementStore.ids.length }}】条中转站，删除后将无法恢复，是否确认删除？
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
          <Button title="确认" @ToClick="advertisementStore.deleteAdvertisement">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="advertisementStore.state.deleted=false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-dialog>
      <el-dialog v-model="advertisementStore.state.created">
        <template #header>
          添加中转站
        </template>
        <el-form
            :model="advertisementStore.advertisementCreateData"
        >
          <el-form-item label="中转站图标" prop="logo">
            <el-upload
                drag
                :action="`${advertisementStore.path}/image/upload`"
                with-credentials
                :headers="{'x-access-token':userStore.state.accessToken}"
                :show-file-list="false"
                :on-success="advertisementStore.uploadImage"
                :on-error="advertisementStore.uploadImage"
                name="image"
            >
              <el-image v-if="advertisementStore.advertisementCreateData.ad_image"
                        :src="advertisementStore.advertisementCreateData.ad_image" alt=""/>
              <div v-else class="upload-content">
                <div class="container">
                  <component is="UploadFilled" class="upload-filled"></component>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                </div>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png/jpeg/ico/tiff/gif/svg/webp files with a size less than 20MB.
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="中转站链接" prop="advertisement">
            <el-input size="large" v-model="advertisementStore.advertisementCreateData.link"
                      placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="中转站名称" prop="name">
            <el-input size="large" v-model="advertisementStore.advertisementCreateData.title" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="中转站描述" prop="description">
            <el-input size="large" v-model="advertisementStore.advertisementCreateData.content"
                      placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;margin: 0 auto;">
              <Button title="确认" @ToClick="advertisementStore.createAdvertisement">
                <template #icon>
                  <el-icon>
                    <Check/>
                  </el-icon>
                </template>
              </Button>
              <Button title="取消" @ToClick="advertisementStore.state.created=false">
                <template #icon>
                  <el-icon>
                    <Close/>
                  </el-icon>
                </template>
              </Button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog v-model="advertisementStore.state.updated">
        <template #header>
          编辑中转站
        </template>
        <el-form
            :model="advertisementStore.advertisementUpdateData"
        >
          <el-form-item label="中转站链接" prop="advertisement">
            <el-input size="large" v-model="advertisementStore.advertisementUpdateData.link"
                      placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="中转站名称" prop="name">
            <el-input size="large" v-model="advertisementStore.advertisementUpdateData.title" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="中转站描述" prop="description">
            <el-input size="large" v-model="advertisementStore.advertisementUpdateData.content"
                      placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;margin: 0 auto;">
              <Button title="确认" @ToClick="advertisementStore.updateAdvertisement">
                <template #icon>
                  <el-icon>
                    <Check/>
                  </el-icon>
                </template>
              </Button>
              <Button title="取消" @ToClick="advertisementStore.state.updated=false">
                <template #icon>
                  <el-icon>
                    <Close/>
                  </el-icon>
                </template>
              </Button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th style="width: 60px">选择</th>
          <th>中转站图片</th>
          <th style="width: 460px">中转站图片路径</th>
          <th>中转站名称</th>
          <th>中转站链接</th>
          <th>中转站描述</th>
          <th style="width: 15%">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in advertisementStore.advertisementData" :key="item.id">
          <tr>
            <td style="width: 10px">
              <input :value="item" @change="advertisementStore.isCheck(item,$event)" type="checkbox"/>
            </td>
            <td>
              <el-image style="height: 50px;border-radius: 10px;" :src="item.ad_image" alt=""/>
            </td>
            <td>{{ item.ad_image }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.link }}</td>
            <td>{{ item.content }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="编辑" @ToClick="advertisementStore.getSingle(item)">
                  <template #icon>
                    <el-icon>
                      <DocumentAdd/>
                    </el-icon>
                  </template>
                </Button>
                <Button title="删除" @ToClick="advertisementStore.deleteSingle(item)">
                  <template #icon>
                    <el-icon>
                      <Close/>
                    </el-icon>
                  </template>
                </Button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <el-pagination
        popper-class="item-pagination"
        style="margin-left: 20px;display: flex;justify-content: center;"
        :current-page="advertisementStore.state.page"
        :page-size="advertisementStore.state.page_size"
        :page-sizes="[10, 30, 50, 100]"
        :total="advertisementStore.state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="advertisementStore.handleCurrentChange"
        @size-change="advertisementStore.handleSizeChange"
    />
  </div>
</template>
<style scoped lang="scss">
.advertisement-main {
  padding: 20px;

  .el-image {
    height: 120px;
  }

  .upload-content {
    display: flex;
    height: 120px;

    .container {
      margin: auto;

      .upload-filled {
        height: 32px;
        width: 32px;
      }
    }
  }

  .advertisement-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .advertisement-header-input {
      outline: none;
      font-family: 'YSHST', fangsong;
      border: 1px solid var(--main-color);
      border-radius: 5px;
      width: 500px;
      margin-right: 20px;
      padding: 0 10px;
      font-weight: bold;
      font-size: 1rem;
      background-color: transparent;
      color: var(--main-color);

      &:focus {
        box-shadow: 0 0 10px var(--main-color);
      }
    }
  }

  .table {
    font-weight: bold;
    margin:0 auto;
    font-size: .9rem;
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: none;

    table {
      border-spacing: 12px;
      text-align: center;
    }

    th {
      width: 120px;
      color: var(--main-color);
      padding: 5px 0;
      border-radius: 5px;
      border: 1px solid var(--main-color);
    }

    td {
      color: var(--default-color);
    }
  }

}
</style>