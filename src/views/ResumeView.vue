<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import debounce from 'lodash.debounce'

import DataPanel from '@/components/ResumePanels/DataPanel.vue'
import TypstPreviewer from '@/components/ResumePanels/TypstPreviewer.vue'
import StylePanel from '@/components/ResumePanels/StylePanel.vue'

import { useProjectsStore } from '@/store/projects-store.ts'

const isLoading = ref(true)
const projectStore = useProjectsStore()
const artifact = ref<Uint8Array>(new Uint8Array(0))
const data = computed({
  get() {
    return projectStore.activeProject?.data ?? null
  },
  set(val) {
    if (projectStore.activeProject !== undefined) {
      projectStore.activeProject.data = val
    }
  },
})

const updateArtifact = debounce(async () => {
  if (!projectStore.activeProject) return
  isLoading.value = true
  const newVector = await projectStore.activeProject.compileVector()
  artifact.value = newVector ?? artifact.value
  isLoading.value = false
}, 300)

watch(()=>projectStore.activeProject?.data, updateArtifact, { immediate: true ,deep: true })
</script>

<template>
  <el-splitter>
    <el-splitter-panel>
      <DataPanel v-model:data="data" />
    </el-splitter-panel>
    <el-splitter-panel>
      <TypstPreviewer :artifact="artifact" :is-loading="isLoading" />
    </el-splitter-panel>
    <el-splitter-panel collapsible>
      <StylePanel />
    </el-splitter-panel>
  </el-splitter>
</template>
