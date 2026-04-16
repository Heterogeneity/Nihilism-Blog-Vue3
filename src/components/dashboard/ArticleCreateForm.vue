<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import {nextTick, reactive, ref} from "vue";
import {articleCreate, type ArticleCreateRequest} from "@/api/article.ts";
import {ElMessage, type InputInstance} from "element-plus";
import type {ApiResponse} from "@/utils/axios.ts";
import type {ImageUploadResponse} from "@/api/image.ts";
import Button from "@/components/common/Button.vue";
import {Check, Close, DocumentChecked, Plus} from "@element-plus/icons-vue";
import TagCom from "@/components/common/TagCom.vue";

const props = defineProps<{
  title: string
  content: string
}>()

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const path = ref(import.meta.env.VITE_BASE_API)
const inputValue = ref('')
const inputVisible = ref(false)
const inputRef = ref<InputInstance>()

const articleCreateFormData = reactive<ArticleCreateRequest>({
  cover: "",
  title: props.title,
  category: "",
  tags: [],
  abstract: "",
  content: props.content
})

const handleClose = (tag: string) => {
  articleCreateFormData.tags.splice(articleCreateFormData.tags.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    articleCreateFormData.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleSuccess = (res: ApiResponse<ImageUploadResponse>) => {
  if (res.code === 0) {
    articleCreateFormData.cover = res.data.url
    ElMessage.success(res.msg)
  }
}

const submitForm = async () => {
  const res = await articleCreate(articleCreateFormData)
  if (res.code === 0) {
    ElMessage.success(res.msg)
    layoutStore.state.articleCreateVisible = false
  }
}
</script>

<template>
  <div class="article-create-form">
    <el-form
        :model="articleCreateFormData"
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

          <el-image v-if="articleCreateFormData.cover" :src="articleCreateFormData.cover" alt=""/>

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
            v-model="articleCreateFormData.cover"
            size="large"
            disabled
        />
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input
            v-model="articleCreateFormData.title"
            size="large"
            placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item label="文章类别" prop="category">
        <el-input
            v-model="articleCreateFormData.category"
            size="large"
            placeholder="请输入文章类别"
        />
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <Button :title="tag" v-for="tag in articleCreateFormData.tags"
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
            v-model="articleCreateFormData.abstract"
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
          <Button title="取消" @ToClick="layoutStore.state.articleCreateVisible = false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.article-create-form {
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