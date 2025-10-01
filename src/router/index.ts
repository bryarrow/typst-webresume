import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElLoading } from 'element-plus'

import HomeView from '../views/HomeView.vue'

import { useProjectsStore } from '@/store/projects-store.ts'
import { useWindowStateStore } from '@/store/window-state-store.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/resume/:id',
      name: 'resume',
      component: () => import('../views/ResumeView.vue'),
    },
    {
      path: '/404/:reason?',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      props: true,
    },
  ],
})

router.beforeResolve(async (to) => {
  if (to.name === 'home') return
  if (to.name === 'settings') return '/'
  if (to.name === 'resume') {
    const loading = ElLoading.service({ lock: true })
    const projectStore = useProjectsStore()
    const targetID = to.params.id as string
    if (projectStore.isActiveAndPrepared(targetID)){
      loading.close()
      return
    }
    if (targetID in projectStore.allProjectsData) {
      await projectStore.activateProject(targetID)
      loading.close()
      return
    }
    loading.close()
    const message = `简历项目ID: ${targetID}不存在`
    return '/404/' + message
  }
  return
})

router.afterEach((to) => {
  const { currentTab } = storeToRefs(useWindowStateStore())
  if (to.name === 'home') currentTab.value = 'home'
  if (to.name === 'resume') currentTab.value = to.params.id as string
  if (to.name === 'settings') currentTab.value = 'settings'
})

export default router
