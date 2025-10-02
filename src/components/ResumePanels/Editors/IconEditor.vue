<script setup lang="ts">
import { join } from '@fireflysemantics/join'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const iconUrl = defineModel<string | null>({ required: true })
const { templatePath } = defineProps<{ templatePath: string }>()
</script>

<template>
  <el-button
    class="w-full"
    @click="ElMessage.primary({ message: 'Working In Progress', placement: 'bottom-left' })"
  >
    <el-icon>
      <img v-if="iconUrl" :src="join(templatePath, iconUrl)" alt="Link icon" />
      <Plus v-else />
    </el-icon>
  </el-button>
</template>

<style scoped></style>
