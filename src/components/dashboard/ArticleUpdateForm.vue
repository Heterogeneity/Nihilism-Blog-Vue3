<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import {nextTick, reactive, ref} from "vue";
import {
  type Article,
  articleCreate,
  type ArticleCreateRequest,
  articleUpdate,
  type ArticleUpdateRequest
} from "@/api/article.ts";
import {ElMessage, type InputInstance} from "element-plus";
import type {ApiResponse} from "@/utils/axios.ts";
import type {ImageUploadResponse} from "@/api/image.ts";
import Button from "@/components/common/Button.vue";
import {Check, Close, DocumentChecked, Edit, Plus} from "@element-plus/icons-vue";
import ArticleUpdateForm from "@/components/dashboard/ArticleUpdateForm.vue";
import type {Hit} from "@/api/common.ts";
import axios, {type AxiosResponse} from "axios";
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = defineProps<{
  item: Hit<Article> | any
}>()

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const path = ref(import.meta.env.VITE_BASE_API)
const inputValue = ref('')
const inputVisible = ref(false)
const inputRef = ref<InputInstance>()
const openArticle = ref(false)
const articleUpdateFormData = reactive<ArticleUpdateRequest>({
  id: props.item._id,
  cover: props.item._source.cover,
  title: props.item._source.title,
  category: props.item._source.category,
  tags: props.item._source.tags,
  abstract: props.item._source.abstract,
  content: props.item._source.content
})

const handleClose = (tag: string) => {
  articleUpdateFormData.tags.splice(articleUpdateFormData.tags.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value!.input!.focus()
  })
}

const onUploadImg = async (files: File[], callback: (urls: string[]) => void): Promise<void> => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise<AxiosResponse<ApiResponse<ImageUploadResponse>>>((resolve, reject) => {
          const form = new FormData();
          form.append('image', file);
          axios
              .post('/api/image/upload', form, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
              })
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        });
      })
  );
  callback(res.map((item) => item.data.data.url));
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    articleUpdateFormData.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleSuccess = (res: ApiResponse<ImageUploadResponse>) => {
  if (res.code === 0) {
    articleUpdateFormData.cover = res.data.url
    ElMessage.success(res.msg)
  }
}

const submitForm = async () => {
  const res = await articleUpdate(articleUpdateFormData)
  if (res.code === 0) {
    ElMessage.success(res.msg)
    layoutStore.state.articleUpdateVisible = false
  }
}

const openContent = (item: any) => {
  openArticle.value = true
  articleUpdateFormData.content = item._source.content
}
</script>

<template>
  <div class="article-update-form">
    <el-form
        :model="articleUpdateFormData"
        :validate-on-rule-change="false"
    >
      <el-form-item label="文章封面" prop="cover">
        <el-upload
            :action="`${path}/image/upload`"
            drag
            with-credentials
            :headers="{'x-access-token':userStore.state.accessToken}"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleSuccess"
            name="image"
        >
          <el-image v-if="articleUpdateFormData.cover" :src="articleUpdateFormData.cover" alt=""/>
          <div v-else class="upload-content">
            <div class="container">
              <component is="UploadFilled" class="upload-filled"></component>
              <div class="el-upload__text">
                在此处拖放文件或<em>点击上传</em>
              </div>
            </div>
          </div>

          <template #tip>
            <div class="el-upload__tip">
              jpg/png/jpeg/ico/tiff/gif/svg/webp 文件大小不超过 20MB.
            </div>
          </template>
        </el-upload>

        <el-input
            v-model="articleUpdateFormData.cover"
            size="large"
            disabled
        />
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input
            v-model="articleUpdateFormData.title"
            size="large"
            placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item label="文章类别" prop="category">
        <el-input
            v-model="articleUpdateFormData.category"
            size="large"
            placeholder="请输入文章类别"
        />
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <Button :title="tag" v-for="tag in articleUpdateFormData.tags"
                @toClick="handleClose(tag)">
        </Button>
        <el-input
            v-if="inputVisible"
            ref="inputRef"
            v-model="inputValue"
            style="width: 80px"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <Button title="新建标签" v-else @ToClick="showInput">
          <template #icon>
            <el-icon>
              <Plus/>
            </el-icon>
          </template>
        </Button>
      </el-form-item>
      <el-form-item label="文章简介" prop="abstract">
        <el-input
            v-model="articleUpdateFormData.abstract"
            type="textarea"
            placeholder="请输入文章简介"
        />
      </el-form-item>
      <el-form-item>
        <div class="button-group">
          <Button title="确定" @ToClick="submitForm">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="layoutStore.state.articleUpdateVisible = false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
          <Button title="编辑正文" @ToClick="openContent(item)">
            <template #icon>
              <el-icon>
                <Edit/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-form-item>
      <el-dialog style="position: absolute;top: -15%;right: 0;" v-model="openArticle" width="1700">
        <MdEditor style="height: 94vh;width: 100%;background-color: var(--bc-color);" v-model="articleUpdateFormData.content" @onUploadImg="onUploadImg"/>
      </el-dialog>

    </el-form>
  </div>
</template>

<style scoped lang="scss">
.article-update-form {
  .el-form {
    .el-form-item {
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

      .button-group {
        display: flex;
        margin: 0 auto;
      }
    }
  }
}
</style>

<style lang="scss">
.el-upload {
  --el-upload-dragger-padding-horizontal: 0px;
  --el-upload-dragger-padding-vertical: 0px;
  line-height: 0;
}
</style>