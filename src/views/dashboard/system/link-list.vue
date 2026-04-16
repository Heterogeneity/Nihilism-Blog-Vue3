<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Check, Close, Delete, Document, DocumentAdd, FolderAdd, Search, Select} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useLinkStore} from "@/stores/link.ts";
import {useUserStore} from "@/stores/user.ts";

const linkStore = useLinkStore()
const userStore = useUserStore()

onMounted(() => {
  linkStore.getLinkList()
})
</script>

<template>
  <div class="link-main">
    <Title title="友链列表"/>
    <div class="link-header">
      <input name="name" class="link-header-input" type="text" v-model="linkStore.linkListRequest.name"
             placeholder="请输入友链名称">
      <input name="description" class="link-header-input" type="text" v-model="linkStore.linkListRequest.description"
             placeholder="请输入友链描述">
      <Button title="查询" @ToClick="linkStore.getLinkList">
        <template #icon>
          <el-icon>
            <Search/>
          </el-icon>
        </template>
      </Button>
      <Button title="添加友链" @ToClick="linkStore.state.created=true">
        <template #icon>
          <el-icon>
            <FolderAdd/>
          </el-icon>
        </template>
      </Button>
      <Button title="批量删除" @ToClick="linkStore.selectIds">
        <template #icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </template>
      </Button>
      <el-dialog
          v-model="linkStore.state.deleted"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除
        </template>
        <div>
          您已选中【{{ linkStore.ids.length }}】条友链，删除后将无法恢复，是否确认删除？
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
          <Button title="确认" @ToClick="linkStore.deleteLink">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="linkStore.state.deleted=false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-dialog>
      <el-dialog v-model="linkStore.state.created">
        <template #header>
          添加友链
        </template>
        <el-form
            :model="linkStore.linkCreateData"
        >
          <el-form-item label="友链图标" prop="logo">
            <el-upload
                drag
                :action="`${linkStore.path}/image/upload`"
                with-credentials
                :headers="{'x-access-token':userStore.state.accessToken}"
                :show-file-list="false"
                :on-success="linkStore.uploadImage"
                :on-error="linkStore.uploadImage"
                name="image"
            >
              <el-image v-if="linkStore.linkCreateData.logo" :src="linkStore.linkCreateData.logo" alt=""/>
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
          <el-form-item label="友链链接" prop="link">
            <el-input size="large" v-model="linkStore.linkCreateData.link" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="友链名称" prop="name">
            <el-input size="large" v-model="linkStore.linkCreateData.name" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="友链描述" prop="description">
            <el-input size="large" v-model="linkStore.linkCreateData.description" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;margin: 0 auto;">
              <Button title="确认" @ToClick="linkStore.createLink">
                <template #icon>
                  <el-icon>
                    <Check/>
                  </el-icon>
                </template>
              </Button>
              <Button title="取消" @ToClick="linkStore.state.created=false">
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
      <el-dialog v-model="linkStore.state.updated">
        <template #header>
          编辑友链
        </template>
        <el-form

        >
          <el-form-item label="友链链接" prop="link">
            <el-input size="large" v-model="linkStore.linkUpdateData.link" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="友链名称" prop="name">
            <el-input size="large" v-model="linkStore.linkUpdateData.name" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="友链描述" prop="description">
            <el-input size="large" v-model="linkStore.linkUpdateData.description" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;margin: 0 auto;">
              <Button title="确认" @ToClick="linkStore.updateLink">
                <template #icon>
                  <el-icon>
                    <Check/>
                  </el-icon>
                </template>
              </Button>
              <Button title="取消" @ToClick="linkStore.state.updated=false">
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
          <th>友链图片</th>
          <th style="width: 510px">友链图片路径</th>
          <th>友链名称</th>
          <th>友链链接</th>
          <th>友链描述</th>
          <th style="width: 15%">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in linkStore.linkData" :key="item.id">
          <tr>
            <td style="width: 10px">
              <input :value="item" @change="linkStore.isCheck(item,$event)" type="checkbox"/>
            </td>
            <td>
              <el-image style="height: 50px;border-radius: 10px;" :src="item.logo" alt=""/>
            </td>
            <td>{{ item.logo }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.link }}</td>
            <td>{{ item.description }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="编辑" @ToClick="linkStore.getSingle(item)">
                  <template #icon>
                    <el-icon>
                      <DocumentAdd/>
                    </el-icon>
                  </template>
                </Button>
                <Button title="删除" @ToClick="linkStore.deleteSingle(item)">
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
        :current-page="linkStore.state.page"
        :page-size="linkStore.state.page_size"
        :page-sizes="[10, 30, 50, 100]"
        :total="linkStore.state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="linkStore.handleCurrentChange"
        @size-change="linkStore.handleSizeChange"
    />
  </div>
</template>
<style scoped lang="scss">
.link-main {
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

  .link-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .link-header-input {
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