<script setup lang="ts">
import { type Data, Section } from '@/utils/template/template-data/data.ts'
import AuthorInfo from '@/components/ResumePanels/DataSubPanel/AuthorInfo.vue'
import SectionPanel from '@/components/ResumePanels/DataSubPanel/SectionPanel.vue'
import { Plus } from '@element-plus/icons-vue'

const projectData = defineModel<Data | null>('data', { required: true })
const { templatePath } = defineProps<{ templatePath: string }>()

const removeSection = (target: Section) => {
  const newSections = projectData.value?.sections.filter((section) => section !== target)
  if (newSections && projectData.value) projectData.value.sections = newSections
}
const addSection = () => {
  if (projectData.value) projectData.value.sections.push(new Section())
}
</script>

<template>
  <div class="h-[90%] p-4 bg-white dark:bg-[rgba(59,58,72,1)] mx-2 rounded shadow">
    <el-scrollbar v-loading="projectData === null">
      <div v-if="projectData !== null">
        <el-space direction="vertical" fill="fill" class="w-full">
          <!-- Author Info -->
          <AuthorInfo v-model:data="projectData" :template-path="templatePath" />

          <!-- Sections -->
          <template v-for="idx in projectData.sections.keys()" :key="idx">
            <SectionPanel
              :template-path="templatePath"
              :remover="removeSection"
              v-model="projectData.sections[idx]"
            />
          </template>
          <el-card shadow="never">
            <el-button :icon="Plus" @click="addSection" class="!border-dashed w-full h-full"
              >Add a section</el-button
            >
          </el-card>
        </el-space>
      </div>

      <p v-else class="text-gray-500">Loading project data...</p>
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
