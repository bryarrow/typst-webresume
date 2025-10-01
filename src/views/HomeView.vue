<script setup lang="ts">
import { useProjectsStore } from '@/store/projects-store.ts'
import router from '@/router'

const projectsStore = useProjectsStore()
const newProject = () => {
  projectsStore.addProject(
    `test-${Object.keys(projectsStore.allProjectsData).length + 1}`,
    'typsume-cv-miku',
  )
}
</script>

<template>
  <div class="h-full">
    <el-button
      v-for="proj of projectsStore.allProjectsData"
      :key="proj.id"
      @click="router.push(`/resume/${proj.id}`)"
    >
      {{ proj.name }}
    </el-button>
    <el-button @click="newProject">New</el-button>
  </div>
</template>
