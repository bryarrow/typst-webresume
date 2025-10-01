<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import type { TabPaneName } from 'element-plus'
import router from '@/router'
import { useProjectsStore } from '@/store/projects-store.ts'
import { useWindowStateStore } from '@/store/window-state-store.ts'

const projectsStore = useProjectsStore()
const { currentTab, title } = storeToRefs(useWindowStateStore())

const changeTab = (target: TabPaneName) => {
  switch (target) {
    case 'home':
      router.push('/')
      break
    case 'settings':
      router.push('/')
      break
    default:
      router.push(`/resume/${currentTab.value}`)
  }
}

const removeTab = async (targetName: TabPaneName) => {
  const afterClose = projectsStore.openedProjectsID.filter((item) => item !== targetName)
  if (targetName === currentTab.value) {
    if (afterClose.length === 0) {
      await projectsStore.closeProject(targetName)
      await router.push('/')
    } else {
      const index = projectsStore.openedProjectsID.indexOf(targetName)
      const next =
        projectsStore.openedProjectsID[index + 1] || projectsStore.openedProjectsID[index - 1]
      if (next) {
        await projectsStore.closeProject(targetName, next)
        await router.push(`/resume/${next}`)
      } else {
        await router.push('/')
        await projectsStore.closeProject(targetName)
      }
    }
  } else {
    if (typeof targetName === 'string') {
      await projectsStore.closeProject(targetName)
    }
  }
}
</script>

<template>
  <el-container class="bg-gray-100 dark:bg-[rgba(59,58,72,1)] h-screen">
    <el-header class="bg-transparent !h-0 md:!h-[5vh]">{{title}}</el-header>
    <div class="md:hidden bg-white dark:bg-black h-15 w-full"></div>
    <el-main class="h-full md:h-[95vh] !p-0 !overflow-hidden bg-white dark:bg-black">
      <el-tabs type="card" v-model="currentTab" @tab-remove="removeTab" @tab-change="changeTab">
        <el-tab-pane label="Home" name="home"></el-tab-pane>
        <el-tab-pane
          v-for="projId of projectsStore.openedProjectsID"
          :key="projId"
          :name="projId"
          :label="projectsStore.allProjectsData[projId].name"
          closable
          stretch
        >
        </el-tab-pane>
        <el-tab-pane label="Settings" name="settings"> </el-tab-pane>
      </el-tabs>
      <RouterView />
    </el-main>
  </el-container>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
@reference './assets/main.css';
:deep(.el-tabs__item:not(.is-active)) {
  @apply dark:!text-gray-300 dark:hover:!text-gray-50;
}
:deep(.el-tabs__item.is-active) {
  @apply dark:!text-teal-600 !border-b-teal-600 border-b-4;
}
:deep(.el-tabs__nav-wrap) {
  @apply !bg-gray-100 dark:!bg-[rgba(59,58,72,1)];
}
</style>
