<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {onMounted, ref} from "vue";
import {userChart, type UserChartRequest, type UserChartResponse, userWeather} from "@/api/user.ts";
import {type Tag, useTagStore} from "@/stores/tag.ts";
import router from "@/router";
import {useWebsiteStore} from "@/stores/website.ts";
import UserActivityChart from "@/components/widgets/UserActivityChart.vue";

interface Entrance {
  title: string
  name: string
  src: string
}

const userStore = useUserStore()
const tagStore = useTagStore()
const useWebsite = useWebsiteStore()
const entranceList: Entrance[] = [
  {
    title: '我的信息',
    name: 'user-info',
    src: "/dashboard-home/info.png"
  },
  {
    title: '我的收藏',
    name: 'user-star',
    src: "/dashboard-home/collection.png"

  },
  {
    title: '我的评论',
    name: 'user-comment',
    src: "/dashboard-home/comment.png"
  },
  {
    title: '我的反馈',
    name: 'user-feedback',
    src: "/dashboard-home/feedback.png"
  }
]
const userChartOptions = [
  {
    value: 7,
    label: '七天',
  },
  {
    value: 30,
    label: '一个月',
  },
  {
    value: 90,
    label: '三个月',
  },
  {
    value: 180,
    label: '六个月',
  },
  {
    value: 365,
    label: '一年',
  },
]
const userChartRequest = ref<UserChartRequest>({
  date: 7
})
const chart = ref<UserChartResponse>({
  date_list: [],
  login_data: [],
  register_data: [],
})
const weatherInfo = ref("")
const isShow = ref(false)

const handleClick = (item: Entrance) => {
  const newTag: Tag = {
    title: item.title,
    name: item.name
  }
  router.push({name: item.name})
  const exists = tagStore.state.tags.some(tag => tag.name === newTag.name)
  if (exists) return
  tagStore.state.tags.push(newTag)
}

const getWeatherInfo = async () => {
  if (weatherInfo.value == "") {
    const res = await userWeather()
    if (res.code === 0) {
      weatherInfo.value = res.data
    }
    localStorage.setItem("weather", JSON.stringify(weatherInfo.value))
  } else {
    weatherInfo.value = localStorage.getItem("weather") as string
  }
}

const getChartInfo = async () => {
  isShow.value = false
  const res = await userChart(userChartRequest.value)
  if (res.code === 0) {
    chart.value = res.data
    isShow.value = true
  }
}

onMounted(() => {
  getChartInfo()
  getWeatherInfo()
})

</script>

<template>
  <div class="home">
    <div class="content">
      <div class="content-left">
        <div class="header">
          <div class="user-card">
            <div>
              <span style="color: var(--main-color)">你好，{{ userStore.state.userInfo.username }}</span>，今天也要加油啊！
            </div>
          </div>
          <div class="weather">
            {{ weatherInfo }}
          </div>
        </div>
        <div class="quick">
          <div class="quick-title">快捷入口</div>
          <div class="quick-list">
            <div @click="handleClick(item)" class="quick-item" v-for="item in entranceList">
              <img class="quick-img" :src="item.src" alt="item.title"/>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-title">
            用户数据
          </div>
          <div class="time-select">
            <el-select
                @change="getChartInfo"
                v-model="userChartRequest.date"
                placeholder="Select"
                style="width: 200px"
            >
              <el-option
                  v-for="item in userChartOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <user-activity-chart v-if="isShow" :chart="chart"/>
        </div>
      </div>

      <div class="content-right">
        <div class="title">博客声明</div>
        <div class="text">
          欢迎访问本博客！本博客致力于分享技术文章、开发经验及个人心得，内容主要涵盖编程技术、前端开发、后端开发、数据库设计、软件架构、开源项目等领域。<br>
          <h3>版权声明</h3>
          本博客中的所有原创文章版权归博客作者所有，转载请注明来源。<br>
          部分文章可能涉及引用其他来源的内容，引用的内容会明确标注出处，版权归原作者所有。<br>
          如果您认为本博客的某些内容侵犯了您的版权或其他权益，请及时联系我们，我们将立即处理。<br>
          <h3>使用条款</h3>
          本博客内容仅供参考和学习交流使用。作者不对内容的准确性、完整性或时效性作出保证，使用时请自行判断。<br>
          本博客的部分内容可能受到第三方工具、平台的影响，无法完全控制其准确性和可用性，使用时请谨慎。<br>
          <h3>隐私政策</h3>
          本博客不会主动收集您的个人信息，除非您主动通过留言、评论或联系方式与我们进行交流。<br>
          所有个人信息将严格保密，不会外泄或用于其他不当用途。<br>
          <h3>联系方式</h3>
          如有任何问题或建议，欢迎通过以下方式与我们联系：<br>
          本人邮箱：{{ useWebsite.state.websiteInfo.email }}<br>
          感谢您的支持和关注，希望本博客能为您的技术成长和知识积累带来帮助！<br>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 20px;
  border-radius: 20px;
  color: var(--default-color);

  .content {
    display: flex;

    .content-left {
      width: 80%;

      .header {
        font-weight: bold;

        .user-card {
          font-size: 1.5rem;
        }

        .weather {
          height: 20px;
          margin: 10px 0;
          font-size: 1.1rem;
          color: var(--default-color);
        }

      }

      .quick {
        width: 80%;
        margin-top: 20px;
        border-radius: 20px;
        padding: 20px;
        font-weight: bold;

        .quick-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .quick-list {
          display: flex;
          align-items: center;
          justify-content: space-around;

          .quick-item {
            cursor: pointer;
            display: flex;
            flex-direction: column;

            .quick-img {
              width: 50px;
              height: 50px;
              padding: 10px;
              margin: 0 auto;
              border-radius: 20px;
              background-color: var(--main-color);
            }
          }
        }
      }

      .chart-card {
        width: 80%;
        padding: 20px;

        .chart-title {
          font-weight: bold;
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }

    .content-right {
      .title {
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 20px;
      }

      .text {
        font-size: 1.1rem;
      }
    }
  }
}
</style>