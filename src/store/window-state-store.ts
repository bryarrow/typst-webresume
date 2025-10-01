import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useProjectsStore } from '@/store/projects-store.ts'

export const useWindowStateStore = defineStore(
  'window',
  () => {
    const currentTab = ref('home')
    const title = computed(() => {
      if (currentTab.value === 'home' || currentTab.value === 'settings') {
        return currentTab.value
      }else{
        const projectStore = useProjectsStore()
        return projectStore.allProjectsData[currentTab.value].name
      }
    })
    return { currentTab, title }
  },
  {
    persist: [
      {
        pick: ['currentTab'],
        storage: sessionStorage,
      },
    ],
  },
)
