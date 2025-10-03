<script setup lang="ts">
import router from '@/router'
import { useProjectsStore } from '@/store/projects-store.ts'
import { Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const projectsStore = useProjectsStore()
const { projectName, projectID } = defineProps<{ projectName: string; projectID: string }>()

const remove = () => {
  const result = projectsStore.removeProject(projectID)
  if (!result) {
    dialogErrorVisible.value = true
    return false
  }
  return true
}
const dialogErrorVisible = ref<boolean>(false)
const dialogConfirmVisible = ref<boolean>(false)
</script>

<template>
  <el-card shadow="hover" body-class="!px-3">
    <el-row justify="space-between" align="middle">
      <!-- Project name -->
      <el-col
        :span="23"
        class="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
        @click="router.push({ name: 'resume', params: { id: projectID } })"
      >
        <span class="truncate text-center font-medium">{{ projectName }}</span>
      </el-col>

      <!-- Del button -->
      <el-col :span="1" class="flex justify-end items-center">
        <el-button
          :icon="Delete"
          class="w-full"
          @click="dialogConfirmVisible = true"
          type="danger"
        />
      </el-col>
    </el-row>
  </el-card>

  <!-- Delete Confirm Dialog -->
  <el-dialog v-model="dialogConfirmVisible">
    <el-result
      icon="warning"
      :title="`Warning: Deleting ${projectName}`"
      :sub-title="`Are you sure to delete resume ${projectName}?`"
    />
    <template #footer>
      <div class="dialog-footer flex justify-end gap-2">
        <el-button @click="dialogConfirmVisible = false">Cancel</el-button>
        <el-button
          type="danger"
          @click="remove(); dialogConfirmVisible = false"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- Del Fail Dialog -->
  <el-dialog v-model="dialogErrorVisible">
    <el-result
      icon="error"
      title="Delete Failed"
      sub-title="Maybe resume project is still open. Close it and retry."
    />
  </el-dialog>
</template>

<style scoped></style>
