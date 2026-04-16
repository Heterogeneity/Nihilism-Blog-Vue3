<script setup lang="ts">
import {onMounted} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Check, Close, Delete, DocumentAdd} from "@element-plus/icons-vue";
import {useFeedbackStore} from "@/stores/feedback.ts";

const feedbackStore = useFeedbackStore()

onMounted(() => {
  feedbackStore.getFeedbackList()
})
</script>

<template>
  <div class="feedback-main">
    <Title title="反馈信息列表"/>
    <div class="feedback-header">
      <Button title="批量删除" @ToClick="feedbackStore.selectIds">
        <template #icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </template>
      </Button>
      <el-pagination
          popper-class="item-pagination"
          style="margin-left: 20px;display: flex;justify-content: center;"
          :current-page="feedbackStore.state.page"
          :page-size="feedbackStore.state.page_size"
          :page-sizes="[10, 30, 50, 100]"
          :total="feedbackStore.state.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="feedbackStore.handleCurrentChange"
          @size-change="feedbackStore.handleSizeChange"
      />
      <el-dialog
          v-model="feedbackStore.state.deleted"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除
        </template>
        <div>
          您已选中【{{ feedbackStore.ids.length }}】条反馈信息，删除后将无法恢复，是否确认删除？
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
          <Button title="确认" @ToClick="feedbackStore.deleteFeedback">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="feedbackStore.state.deleted=false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-dialog>
      <el-dialog v-model="feedbackStore.state.is_reply">
        <template #header>
          编辑反馈信息
        </template>
        <el-form
            :model="feedbackStore.feedbackRelyData"
        >
          <el-form-item label="回复" prop="reply">
            <el-input size="large" v-model="feedbackStore.feedbackRelyData.reply"
                      placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;margin: 0 auto;">
              <Button title="确认" @ToClick="feedbackStore.replyFeedback">
                <template #icon>
                  <el-icon>
                    <Check/>
                  </el-icon>
                </template>
              </Button>
              <Button title="取消" @ToClick="feedbackStore.state.is_reply=false">
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
          <th  style="width: 300px">反馈人UID</th>
          <th style="width: 350px">反馈信息内容</th>
          <th style="width: 350px">反馈信息回复</th>
          <th style="width: 15%">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in feedbackStore.feedbackData" :key="item.id">
          <tr>
            <td style="width: 10px">
              <input :value="item" @change="feedbackStore.isCheck(item,$event)" type="checkbox"/>
            </td>
            <td>{{ item.user_uid }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.reply }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="回复" @ToClick="feedbackStore.getSingle(item)">
                  <template #icon>
                    <el-icon>
                      <DocumentAdd/>
                    </el-icon>
                  </template>
                </Button>
                <Button title="删除" @ToClick="feedbackStore.deleteSingle(item)">
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

  </div>
</template>
<style scoped lang="scss">
.feedback-main {
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

  .feedback-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .feedback-header-input {
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
    margin: 0 auto;
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