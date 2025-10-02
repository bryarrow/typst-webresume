import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useProjectsStore } from '@/store/projects-store.ts'

export const useWindowStateStore = defineStore(
  'window',
  () => {
    const currentTab = ref('home')
    const title = computed(() => {
      if (currentTab.value === 'home' || currentTab.value === 'settings') {
        return currentTab.value
      } else {
        const projectStore = useProjectsStore()
        return projectStore.allProjectsData[currentTab.value].name
      }
    })

    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const currentLocateID = ref('zh-cn')
    const availableLocates = ['en', 'zh-cn']
    return {
      currentTab,
      title,
      isDark,
      toggleDark,
      currentLocateID,
      availableLocates,
    }
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
