import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('../pages/Skills.vue'),
    meta: { title: 'Skills' }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../pages/Resume.vue'),
    meta: { title: 'Resume' }
  },
  {
    path: '/photos',
    name: 'Photos',
    component: () => import('../pages/Photos.vue'),
    meta: { title: 'Photography' }
  },
  {
    path: '/anime',
    name: 'Anime',
    component: () => import('../pages/Anime.vue'),
    meta: { title: 'Anime Tracker' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../pages/Blog.vue'),
    meta: { title: 'Blog' }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../pages/BlogPost.vue'),
    meta: { title: 'Blog Post' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Personal Portfolio`
  next()
})

export default router 