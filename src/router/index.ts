import {createRouter, createWebHistory} from 'vue-router'
import Web from '../views/web/index.vue'
import Index from '../views/web/index/index.vue'
import Search from '../views/web/search/index.vue'
import News from '../views/web/news/index.vue'
import Links from '../views/web/link/index.vue'
import About from '../views/web/about/index.vue'
import Article from '../views/web/article/index.vue'

import Dashboard from '../views/dashboard/index.vue'
import Home from '../views/dashboard/home/index.vue'

import UserInfo from '../views/dashboard/user-center/user-info/index.vue'
import UserStar from '../views/dashboard/user-center/user-star/index.vue'
import UserComment from '../views/dashboard/user-center/user-comment/index.vue'
import UserFeedBack from '../views/dashboard/user-center/user-feedback/index.vue'

import UserList from '../views/dashboard/users/index.vue'

import ArticleList from '../views/dashboard/articles/article-list/index.vue'
import ArticlePublish from '../views/dashboard/articles/article-publish/index.vue'
import CommentList from '../views/dashboard/articles/comment-list/index.vue'

import ImageList from '../views/dashboard/images/index.vue'

import FeedbackList from '../views/dashboard/system/feedback-list.vue'
import AdvertisementList from '../views/dashboard/system/advertisement-list.vue'
import LinkList from '../views/dashboard/system/link-list.vue'
import LoginLog from '../views/dashboard/system/login-logs.vue'
import AppConfig from '../views/dashboard/system/app-config.vue'

import EmailConfig from '../views/dashboard/system/config/email-config.vue'
import JwtConfig from '../views/dashboard/system/config/jwt-config.vue'
import QQConfig from '../views/dashboard/system/config/qq-config.vue'
import SiteConfig from '../views/dashboard/system/config/site-config.vue'
import QiniuConfig from '../views/dashboard/system/config/qiniu-config.vue'
import SystemConfig from '../views/dashboard/system/config/system-config.vue'
import GaodeConfig from '../views/dashboard/system/config/gaode-config.vue'


import Error from '../views/error/index.vue'
import {useUserStore} from "@/stores/user.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import {ElMessageBox} from "element-plus";
import {end, start} from "@/utils/nprogress.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'web',
            component: Web,
            redirect: "index",
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'search',
                    name: 'search',
                    component: Search,
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: 'news',
                    name: 'news',
                    component: News,
                    meta: {
                        title: '新闻'
                    }
                },
                {
                    path: 'links',
                    name: 'links',
                    component: Links,
                    meta: {
                        title: '友链'
                    }
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About,
                    meta: {
                        title: '关于'
                    }
                },
            ],
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            redirect: "home",
            meta: {
                title: '后台管理',
                requiresAuth: true,
            },
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Home,
                    meta: {
                        title: '主页'
                    }
                },
                {
                    path: 'user-center',
                    name: 'user-center',
                    meta: {
                        title: '个人中心'
                    },
                    children: [
                        {
                            path: 'user-info',
                            name: 'user-info',
                            component: UserInfo,
                            meta: {
                                title: '我的信息'
                            },
                        }, {
                            path: 'user-star',
                            name: 'user-star',
                            component: UserStar,
                            meta: {
                                title: '我的收藏'
                            },
                        }, {
                            path: 'user-comment',
                            name: 'user-comment',
                            component: UserComment,
                            meta: {
                                title: '我的评论'
                            },
                        }, {
                            path: 'user-feedback',
                            name: 'user-feedback',
                            component: UserFeedBack,
                            meta: {
                                title: '我的反馈'
                            },
                        },
                    ]
                },
                {
                    path: 'users',
                    name: 'users',
                    meta: {
                        title: '用户管理',
                        requiresAuth: true,
                    },
                    children: [
                        {
                            path: 'user-list',
                            name: 'user-list',
                            component: UserList,
                            meta: {
                                title: '用户列表'
                            },
                        }
                    ]
                },
                {
                    path: 'articles',
                    name: 'articles',
                    meta: {
                        title: '文章管理',
                        requiresAuth: true,
                    },
                    children: [
                        {
                            path: 'article-publish',
                            name: 'article-publish',
                            component: ArticlePublish,
                            meta: {
                                title: '发布文章'
                            },
                        },
                        {
                            path: 'comment-list',
                            name: 'comment-list',
                            component: CommentList,
                            meta: {
                                title: '评论列表'
                            },
                        },
                        {
                            path: 'article-list',
                            name: 'article-list',
                            component: ArticleList,
                            meta: {
                                title: '文章列表'
                            },
                        },
                    ]
                },
                {
                    path: 'images',
                    name: 'images',
                    meta: {
                        title: '图片管理',
                        requiresAuth: true,
                    },
                    children: [
                        {
                            path: 'image-list',
                            name: 'image-list',
                            component: ImageList,
                            meta: {
                                title: '图片列表'
                            },
                        }
                    ]
                },
                {
                    path: 'system',
                    name: 'system',
                    meta: {
                        title: '系统管理',
                        requiresAuth: true,
                    },
                    children: [
                        {
                            path: 'feedback-list',
                            name: 'feedback-list',
                            component: FeedbackList,
                            meta: {
                                title: '反馈列表'
                            }
                        },
                        {
                            path: 'advertisement-list',
                            name: 'advertisement-list',
                            component: AdvertisementList,
                            meta: {
                                title: '中转站列表'
                            }
                        },
                        {
                            path: 'link-list',
                            name: 'link-list',
                            component: LinkList,
                            meta: {
                                title: '友链列表'
                            }
                        },
                        {
                            path: 'login-logs',
                            name: 'login-logs',
                            component: LoginLog,
                            meta: {
                                title: '登录日志'
                            }
                        },
                        {
                            path: 'app-config',
                            name: 'app-config',
                            component: AppConfig,
                            meta: {
                                title: '应用配置'
                            },
                            children: [
                                {
                                    path: 'site-config',
                                    name: 'site-config',
                                    component: SiteConfig,
                                    meta: {
                                        title: '网站配置'
                                    }
                                },
                                {
                                    path: 'system-config',
                                    name: 'system-config',
                                    component: SystemConfig,
                                    meta: {
                                        title: '系统配置'
                                    }
                                },
                                {
                                    path: 'email-config',
                                    name: 'email-config',
                                    component: EmailConfig,
                                    meta: {
                                        title: '邮箱配置'
                                    }
                                },
                                {
                                    path: 'qq-config',
                                    name: 'qq-config',
                                    component: QQConfig,
                                    meta: {
                                        title: 'QQ登录配置'
                                    }
                                },
                                {
                                    path: 'qiniu-config',
                                    name: 'qiniu-config',
                                    component: QiniuConfig,
                                    meta: {
                                        title: '七牛云配置'
                                    }
                                },
                                {
                                    path: 'jwt-config',
                                    name: 'jwt-config',
                                    component: JwtConfig,
                                    meta: {
                                        title: 'jwt配置'
                                    }
                                },
                                {
                                    path: 'gaode-config',
                                    name: 'gaode-config',
                                    component: GaodeConfig,
                                    meta: {
                                        title: '高德配置'
                                    }
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: Error,
        },
        {
            path: '/:catchAll(.*)',
            component: Error,
        }
    ],
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const layoutStore = useLayoutStore()
    userStore.initializeUserInfo().then(() => {
        const isAuthenticated = userStore.isLoggedIn
        const isAdmin = userStore.isAdmin
        if (isAuthenticated) {
            layoutStore.state.mainPanel = '个人中心'
        }
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!isAuthenticated) {
                ElMessageBox.confirm('登录已过期，需要重新登录？', 'Warning', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                }).then(() => {
                    router.push({name: 'index', replace: true}).then(() => {
                        layoutStore.state.popoverVisible = true
                        layoutStore.state.mainPanel = 'main'
                    })
                })
            } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
                ElMessageBox.confirm(
                    '权限不足，请确认您的用户角色是否具备访问该页面的权限。',
                    'Warning',
                    {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }
                ).then(() => {
                    router.push(from.path).then()
                })
            } else {
                start()
                next()
            }
        } else {
            start()
            next()
        }
    })
})

router.afterEach((to, from, next) => {
    end()
})

export default router
