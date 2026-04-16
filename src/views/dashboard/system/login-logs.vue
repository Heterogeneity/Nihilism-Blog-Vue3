<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getLoginList, type Login, type UserLoginListRequest} from "@/api/user.ts";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


const page = ref(1)
const page_size = ref(10)
const total = ref(0)
const userLoginData = ref<Login[]>()
const userLoginListRequest = reactive<UserLoginListRequest>({
  uid: null,
  page: 1,
  page_size: 10
})

const getUserLoginData = async () => {
  if (userLoginListRequest.uid === "") {
    userLoginListRequest.uid = null
  }
  userLoginListRequest.page = page.value
  userLoginListRequest.page_size = page_size.value
  const table = await getLoginList(userLoginListRequest)
  if (table.code === 0) {
    total.value = table.data.total
    userLoginData.value = table.data.list
    ElMessage.success(table.msg)
  } else {
    ElMessage.error(table.msg)
  }
}

const getTime = (date: Date): string => {
  const time = new Date(date)
  return time.toLocaleString()
}
const handleCurrentChange = (val: number) => {
  page.value = val
  getUserLoginData()

}
const handleSizeChange = (val: number) => {
  page_size.value = val
  getUserLoginData()
}

onMounted(() => {
  getUserLoginData()
})
</script>

<template>
  <div class="login-log-main">
    <Title title="登录日志"/>
    <div class="login-search">
      <input name="uid" class="login-search-input" type="text" v-model="userLoginListRequest.uid"
             placeholder="请输入用户uid">
      <Button title="查询" @ToClick="getUserLoginData">
        <template #icon>
          <el-icon>
            <Search/>
          </el-icon>
        </template>
      </Button>
      <el-pagination
          popper-class="item-pagination"
          style="margin-left: 20px;display: flex;justify-content: center;"
          :current-page="page"
          :page-size="page_size"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
      />
    </div>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th>ID</th>
          <th>登录方式</th>
          <th>用户名</th>
          <th>登录时间</th>
          <th>IP</th>
          <th>登录地址</th>
          <th>操作系统</th>
          <th>设备信息</th>
          <th>浏览器信息</th>
          <th>登录状态</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in userLoginData" :key="item.id">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.login_method }}</td>
            <td>{{ item.user.username }}</td>
            <td>{{ getTime(item.created_at) }}</td>
            <td>{{ item.ip }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.os }}</td>
            <td>{{ item.device_info }}</td>
            <td>{{ item.browser_info }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login-log-main {
  padding: 20px;

  .login-search {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .login-search-input {
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
    font-size: 1rem;
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