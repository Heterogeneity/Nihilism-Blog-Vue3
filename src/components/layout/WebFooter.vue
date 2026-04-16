<script setup lang="ts">
import {type FooterLink, websiteFooterLink} from "@/api/website.ts";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useWebsiteStore} from "@/stores/website.ts";

const footerLinkList = ref<FooterLink[]>([])
const websiteStore = useWebsiteStore()
let timerId: any
const elapsedTime = ref("")

const publicSecurityFilingLink = computed(() => "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=" + websiteStore.state.websiteInfo.public_security_filing.match(/\d+/))

const skill = computed(() => {
  const skillStr = websiteStore.state.websiteInfo.skill
  return skillStr ? skillStr.split('|') : []
})

const socialLinks = computed(() => [
  {
    src: "/icon/bilibili.png",
    alt: "",
    url: websiteStore.state.websiteInfo.bilibili_url
  },
  {
    src: "/icon/QQ.png",
    alt: "",
    url: websiteStore.state.websiteInfo.email
  },
  {
    src: "/icon/gitee.png",
    alt: "",
    url: websiteStore.state.websiteInfo.gitee_url
  },
  {
    src: "/icon/github.png",
    alt: "",
    url: websiteStore.state.websiteInfo.github_url
  },
])

const getFooterLinkList = async () => {
  const res = await websiteFooterLink()
  if (res.code == 0) {
    footerLinkList.value = res.data
  }
}
const updateElapsedTime = async () => {
  let creationDate = websiteStore.state.websiteInfo.created_at
  if (creationDate) {
    let creationTimestamp = new Date(creationDate).getTime()
    let currentTimestamp = new Date().getTime()
    let totalDays = (currentTimestamp - creationTimestamp) / 1000 / (60 * 60 * 24)
    let daysPassed = Math.floor(totalDays)
    let hoursRemaining = Math.floor((totalDays - daysPassed) * 24)
    let minutesRemaining = Math.floor((totalDays - daysPassed - (hoursRemaining / 24)) * 24 * 60)
    let secondsRemaining = Math.floor((totalDays - daysPassed - (hoursRemaining / 24) - (minutesRemaining / 24 / 60)) * 24 * 60 * 60)
    elapsedTime.value = `${daysPassed}天${hoursRemaining}时${minutesRemaining}分${secondsRemaining}秒`
  }
}

const initializedTimer = () => {
  updateElapsedTime()
  timerId = setInterval(() => {
    updateElapsedTime()
  }, 1000)
}


onMounted(() => {
  getFooterLinkList()
  initializedTimer()
})

onUnmounted(() => {
  clearInterval(timerId as number)
})


</script>

<template>
  <div class="web-footer">
    <div class="container">
      <div class="footer-left">
        <div class="avatar">
          <div>
            <img class="full-logo"
                 :src="websiteStore.state.websiteInfo.full_logo" alt=""
            />
          </div>
          <div>
            <div><span>{{ websiteStore.state.websiteInfo.title }}</span></div>
            <el-tag
                style="color: var(--main-color);background-color: transparent;box-shadow:0 0 5px var(--main-color);border: 1px solid var(--main-color)"
                size="small">
              version:{{ websiteStore.state.websiteInfo.version }}
            </el-tag>
          </div>
        </div>
        <h4 style="color:var(--default-color);">{{ websiteStore.state.websiteInfo.description }}</h4>
      </div>
      <div class="footer-center">
        <el-space size="large" spacer="|">
          <div class="footer-link" v-for="item in footerLinkList" :key="item.title">
            <el-link underline="never" :href="item.link">{{ item.title }}</el-link>
          </div>
        </el-space>

        <div class="create-at">
          <h3>建站日期：{{ websiteStore.state.websiteInfo.created_at }}</h3>
          <h3>网站已运行：{{ elapsedTime }}</h3>
        </div>
        <div class="filing">
          <el-link href="https://beian.miit.gov.cn/#/Integrated/index" underline="never">
            {{ websiteStore.state.websiteInfo.icp_filing }}
          </el-link>
          <el-link :href=publicSecurityFilingLink underline="never">
            {{ websiteStore.state.websiteInfo.public_security_filing }}
          </el-link>
        </div>
        <div class="bottom">
          <div class="social-link">
            <a v-for="socialLink in socialLinks" :href="socialLink.url" :underline="false">
              <img
                  class="bottom-img"
                  :src="socialLink.src" :alt="socialLink.alt"/>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div style="color: var(--text-color);">
          <h2>个人技术栈</h2>
          <div class="tag-list">
            <div class="right-tag" size="large" v-for="item in skill">
              {{ item }}
            </div>
          </div>

        </div>
        <div style="padding-top: 30px;">
          <img style="opacity: .5;z-index: -1;position: absolute;right:0;bottom:0;border-bottom-right-radius: 20px;border-top-right-radius: 20px;-webkit-filter:drop-shadow(0 0 10px var(--main-color)) ;width: 300px;height: 272px"
               src="/images/left.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.web-footer {
  position: relative;
  bottom: 0;
  width: 1480px;
  display: flex;
  justify-content: center;
  margin: 0 auto 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .container {
    display: flex;
    max-width: 1400px;
    width: 100%;
    padding: 20px;

    .footer-left {
      width: 30%;
      margin: 0 auto;
      font-weight: bold;

      .avatar {
        margin-top: 10px;
        display: flex;
        font-size: 1.5rem;
        align-items: center;
        color: var(--text-color);

        .full-logo {
          box-shadow: 0 0 10px var(--main-color);
          margin-right: 15px;
          height: 90px;
          width: 90px;
          border-radius: 50%;
        }
      }
    }
  }

  .footer-center {
    width: 35%;
    margin-left: 40px;
    font-weight: bold;

    .footer-link {

      .el-link {
        font-size: 1rem;
        font-weight: bold;
        color: var(--default-color);
        margin-top: 20px;
        margin-bottom: 20px;

        &:hover {
          color: var(--main-color);
        }
      }
    }

    .create-at {
      width: 20rem;
      color: var(--text-color);
      margin: 0 10px;
    }

    .filing {
      display: flex;

      .el-image {
        margin: auto 0;
      }

      .el-link {
        margin: 0 10px;
        font-weight: bold;

        &:hover {
          color: var(--text-color);
          text-shadow: 0 2px 3px gray;
        }

      }
    }

    .bottom {
      margin: 20px 0;

      .social-link {
        display: flex;
      }

      .bottom-img {
        background-color: var(--main-color);
        border-radius: 10px;
        padding: 5px;
        margin: 0 5px;
        height: 32px;
        width: 32px;
      }
    }
  }

  .footer-right {
    width: 40%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .tag-list {
      display: flex;
      flex-wrap: wrap;
    }

    .right-tag {
      width: 27%;
      border: 2px solid var(--main-color);
      text-align: center;
      padding: 10px 0;
      border-radius: 5px;
      margin: 5px;
      color: var(--main-color);
      font-size: 1rem;
      font-weight: bold;

      &:hover {
        box-shadow: 0 0 20px var(--main-color);
        background-color: var(--main-color);
        color: var(--select-text-color);
      }
    }
  }
}
</style>