<template>
  <div class="banner-group">
    <div class="banner-top">
      <div class="banner-title">
        <div>千里之行</div>
        <div>始于足下。</div>
      </div>
      <div class="banner-rotate">
        <div class="banner-list">
          <div :style="item.background" class="banner-item" v-for="(item, index) in bannerList" :key="index">
            <img class="banner-item-img" alt="" :src="item.src"/>
          </div>
        </div>
        <div style="margin-left:3rem;" class="banner-list">
          <div :style="item.background" class="banner-item" v-for="(item, index) in reserveList" :key="index">
            <img class="banner-item-img" alt="" :src="item.src"/>
          </div>
        </div>
      </div>
      <div class="banner-mask">
        <div style="padding-top: 2rem;">
          <el-icon style="font-size: 5rem;">
            <Promotion/>
          </el-icon>
        </div>
        <div @click="router.push({name:'search'})" style="display: flex;align-items: center;">
          <p>随便看看</p>
          <el-icon>
            <Right/>
          </el-icon>
        </div>

      </div>
    </div>
<!--    <div class="category-group">-->
<!--      <div :style="item.background" class="category-item" v-for="(item, index) in categoryList.list" :key="item.id">-->
<!--        <span>{{ item.name }}</span>-->
<!--        <div class="category-blur">-->
<!--          <img class="category-icon" alt="" :src="item.icon"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang='ts'>
import {ref, reactive, onMounted} from 'vue'
import {Promotion, Right} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

interface categoryList {
  list: Array<categoryItem>
  count: number
}

interface categoryItem {
  id: number
  name: string
  background: string
  icon?: string
}

interface bannerList {
  src: string,
  background: string
}

let bannerList = reactive<Array<bannerList>>([
  {src: '/icon/css.png', background: 'background:#284ce6'},
  {src: '/icon/h5.png', background: 'background:#e9572b'},
  {src: '/icon/js.png', background: 'background:#f7cb4f'},
  {src: '/icon/git.png', background: 'background:#e9572b'},
  {src: '/icon/fireFox.webp', background: 'background:#e65164'},
  {src: '/icon/docker.png', background: 'background:#57b6e6'},
  {src: '/icon/PS.png', background: 'background:#4082c3'},
  {src: '/icon/why.png', background: 'background:#4499e4'},
  {src: '/icon/Py.png', background: 'background:#FFFFFF'},
  {src: '/icon/webPack.png', background: 'background:#2e3a41'},
  {src: '/icon/vue.png', background: 'background:#b8f0ae'},
  {src: '/icon/Java.jpg', background: 'background:#FFFFFF'},
  {src: '/icon/vite-logo.svg', background: 'background:#927df7'},
  {src: '/icon/react.svg', background: 'background:#222222'},
  {src: '/icon/node-logo.svg', background: 'background:#222222'},
  {src: '/icon/pinia-logo.svg', background: 'background:#FFFFFF'},
  {src: '/icon/css.png', background: 'background:#284ce6'},
  {src: '/icon/h5.png', background: 'background:#e9572b'},
  {src: '/icon/js.png', background: 'background:#f7cb4f'},
  {src: '/icon/git.png', background: 'background:#e9572b'}
])

let reserveList = reactive<Array<bannerList>>([

  {src: '/icon/vite-logo.svg', background: 'background:#927df7'},
  {src: '/icon/react.svg', background: 'background:#222222'},
  {src: '/icon/node-logo.svg', background: 'background:#222222'},
  {src: '/icon/pinia-logo.svg', background: 'background:#FFFFFF'},
  {src: '/icon/css.png', background: 'background:#284ce6'},
  {src: '/icon/h5.png', background: 'background:#e9572b'},
  {src: '/icon/js.png', background: 'background:#f7cb4f'},
  {src: '/icon/git.png', background: 'background:#e9572b'},
  {src: '/icon/css.png', background: 'background:#284ce6'},
  {src: '/icon/h5.png', background: 'background:#e9572b'},
  {src: '/icon/js.png', background: 'background:#f7cb4f'},
  {src: '/icon/git.png', background: 'background:#e9572b'},
  {src: '/icon/fireFox.webp', background: 'background:#e65164'},
  {src: '/icon/docker.png', background: 'background:#57b6e6'},
  {src: '/icon/PS.png', background: 'background:#4082c3'},
  {src: '/icon/why.png', background: 'background:#4499e4'},
  {src: '/icon/Py.png', background: 'background:#FFFFFF'},
  {src: '/icon/webPack.png', background: 'background:#2e3a41'},
  {src: '/icon/vue.png', background: 'background:#b8f0ae'},
  {src: '/icon/Java.jpg', background: 'background:#FFFFFF'},
]);

let categoryList = reactive<categoryList>({
  list: [{
    id: 1,
    name: "前端",
    background: 'background:linear-gradient(to right,#358bff,#15c6ff);',
    icon: '/images/front.png'
  }, {
    id: 2,
    name: "后端",
    background: 'background:linear-gradient(to right,#f65,#ffbf37);',
    icon: '/images/back.png'
  }, {
    id: 3,
    name: "其它",
    background: 'background: linear-gradient(to right,#18e7ae,#1eebeb);',
    icon: '/images/other.png'
  }],
  count: 3
})
const router = useRouter()

onMounted(() => {
})
</script>
<style lang="scss" scoped>
.banner-group {
  height: 330px;
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .banner-top {
    background-color: transparent;
    will-change: transform;
    height: 100%;
    padding: .5rem;
    border-radius: 20px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px var(--main-color);
    overflow: hidden;
    position: relative;

    .banner-title {
      position: absolute;
      top: 15%;
      left: 5%;
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--main-color);
    }

    .banner-mask {
      top: 0;
      left: 0;
      opacity: 0;
      padding-left: 2rem;
      font-size: 4rem;
      line-height: 1rem;
      color: var(--default-bc);
      position: absolute;
      z-index: 10;
      height: 100%;
      width: 100%;
      cursor: pointer;
      background-color: var(--main-color);
      backdrop-filter: blur(10px);
      transition: opacity .5s ease-in-out;
    }

    .banner-rotate {
      margin-top: 140px;
      position: relative;
      transform: rotate(-20deg);
      transition: .3s;

      .banner-list {
        margin-bottom: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-wrap: nowrap;
        animation: rowup 120s linear infinite;
        -webkit-animation: rowup 120s linear infinite;

        .banner-item {
          box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
          margin: 0 .5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          border-radius: 1rem;

          .banner-item-img {
            height: 70px;
            width: 70px;
          }
        }
      }
    }

    &:hover .banner-mask {
      opacity: .9;
    }

    &:hover .banner-title {
      filter: blur(10px);
    }

    &:hover .banner-rotate {
      filter: blur(10px);
    }

  }
}

.category-group {
  height: 120px;
  display: flex;
  justify-content: space-between;
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  margin-bottom: 10px;
}

.category-item:nth-child(1) {
  margin-left: 0;
}

.category-item {
  cursor: pointer;
  height: 100%;
  padding-left: 21px;
  background-size: 200%;
  line-height: 4rem;
  width: 30%;
  position: relative;
  border-radius: .5rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--select-text-color);
  overflow: hidden;
  transition: all .8s ease-in-out;
  display: flex;
  justify-content: space-between;
  margin-left: .75rem;

  .category-blur {
    opacity: .5;
    position: absolute;
    left: 60%;
    top: 40%;
    width: 100%;
    height: 100%;
    background-color: transparent;
    filter: blur(1px);
    transform: scale(1) rotate(15deg);
    transition: .5s;

    .category-icon {
      width: 70px;
      height: 70px;
    }

  }

  &:hover {
    width: 65%;
  }

  &:hover .category-blur {
    left: 55%;
    top: 8%;
    filter: none;
    opacity: .9;
    transform: scale(.7);
  }
}

@media screen and (max-width: 1410px) {
  .banner-group {
    width: 100%;

    .category-item {
      width: 40%;
    }

    .category-blur {
      left: 80%;
      top: 70%;
    }
  }
}
</style>