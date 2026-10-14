import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue'), meta: { title: '首页' } },
  { path: '/article/:id', name: 'ArticleDetail', component: () => import('../views/ArticleDetail.vue'), meta: { title: '文章详情' } },
  { path: '/category', name: 'Category', component: () => import('../views/Category.vue'), meta: { title: '分类' } },
  { path: '/category/:name', name: 'CategoryDetail', component: () => import('../views/Category.vue'), meta: { title: '分类' } },
  { path: '/tag', name: 'Tag', component: () => import('../views/Tag.vue'), meta: { title: '标签' } },
  { path: '/tag/:name', name: 'TagDetail', component: () => import('../views/Tag.vue'), meta: { title: '标签' } },
  { path: '/archive', name: 'Archive', component: () => import('../views/Archive.vue'), meta: { title: '归档' } },
  { path: '/about', name: 'About', component: () => import('../views/About.vue'), meta: { title: '关于' } },
  { path: '/friends', name: 'Friends', component: () => import('../views/Friends.vue'), meta: { title: '友链' } },
  { path: '/message', name: 'MessageBoard', component: () => import('../views/MessageBoard.vue'), meta: { title: '留言板' } },
  { path: '/gallery', name: 'Gallery', component: () => import('../views/Gallery.vue'), meta: { title: '画阁' } },
  { path: '/poetry', name: 'Poetry', component: () => import('../views/Poetry.vue'), meta: { title: '诗苑' } },
  { path: '/solar-terms', name: 'SolarTerms', component: () => import('../views/SolarTerms.vue'), meta: { title: '节气志' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue'), meta: { title: '404' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 云游博客` : '云游博客'
  next()
})

export default router
