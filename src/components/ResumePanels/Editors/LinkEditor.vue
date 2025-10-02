<script setup lang="ts">
import { Link as LinkIcon } from '@element-plus/icons-vue'
import { Link } from '@/utils/template/template-data/data.ts'
import PlainEditor from '@/components/ResumePanels/Editors/PlainEditor.vue'
import { ref } from 'vue'
import IconEditor from '@/components/ResumePanels/Editors/IconEditor.vue'

const data = defineModel<Link>({ required: true })
const { templatePath } = defineProps<{ templatePath: string }>()
const editingLink = ref(false)
</script>

<template>
  <el-row>
    <el-col>
      <el-row :gutter="0">
        <el-col :span="24">
          <PlainEditor v-model="data.linkText">
            <template #prepend>
              <IconEditor v-model="data.iconUrl" :template-path="templatePath" />
              <slot name="prepend" />
            </template>
            <template #append>
              <slot name="append" />
              <el-button
                :icon="LinkIcon"
                @click="editingLink = !editingLink"
                class="w-full !m-0 !p-0"
              />
            </template>
          </PlainEditor>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-input v-if="editingLink" v-model="data.linkUrl" /></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped></style>
