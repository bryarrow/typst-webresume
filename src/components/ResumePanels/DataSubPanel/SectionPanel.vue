<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Delete, Plus } from '@element-plus/icons-vue'
import { DatedBlock, PlainText, Link, type Section } from '@/utils/template/template-data/data.ts'

import IconEditor from '@/components/ResumePanels/Editors/IconEditor.vue'
import PlainEditor from '@/components/ResumePanels/Editors/PlainEditor.vue'
import LinkEditor from '@/components/ResumePanels/Editors/LinkEditor.vue'
import DatedEditor from '@/components/ResumePanels/Editors/DatedEditor.vue'

const data = defineModel<Section>({ required: true })
const { templatePath, remover } = defineProps<{
  templatePath: string
  remover: (target: Section) => void
}>()

const addContent = (type: string) => {
  switch (type) {
    case 'plain-text':
      data.value.content.push(new PlainText(''))
      break
    case 'link':
      data.value.content.push(new Link())
      break
    case 'dated-block':
      data.value.content.push(new DatedBlock())
      break
  }
}
const removeContent = (target: DatedBlock | Link | PlainText) => {
  data.value.content = data.value.content.filter((i) => i !== target)
}

const addType = ref<'plain-text' | 'link' | 'dated-block'>('plain-text')
const addOptions = [
  {
    value: 'plain-text',
    label: 'Text',
  },
  {
    value: 'link',
    label: 'Link',
  },
  {
    value: 'dated-block',
    label: 'Title with Date',
  },
]
</script>

<template>
  <el-card shadow="never" header-class="!py-2">
    <template #header>
      <div class="font-bold text-xl">
        <PlainEditor v-model="data.title">
          <template #prepend>
            <IconEditor :template-path="templatePath" v-model="data.iconUrl" />
          </template>
          <template #append>
            <el-button @click="remover(data)" :icon="Minus" />
          </template>
        </PlainEditor>
      </div>
    </template>
    <template #default>
      <el-space direction="vertical" fill="fill" class="w-full" size="small">
        <template v-for="idx in data.content.keys()" :key="idx">
          <!-- Plain -->
          <el-card shadow="never" v-if="data.content[idx].type === 'plain-text'" body-class="!p-1">
            <el-row :gutter="5">
              <el-col :span="22"><PlainEditor v-model="data.content[idx]" rich /></el-col>
              <el-col :span="2">
                <el-button
                  @click="removeContent(data.content[idx])"
                  :icon="Delete"
                  class="w-full !h-full !border-dashed"
                />
              </el-col>
            </el-row>
          </el-card>
          <!-- Dated -->
          <el-card shadow="never" v-if="data.content[idx].type === 'dated-block'" body-class="!p-1">
            <el-row :gutter="5">
              <el-col :span="22"><DatedEditor v-model="data.content[idx]" rich /></el-col>
              <el-col :span="2">
                <el-button
                  @click="removeContent(data.content[idx])"
                  :icon="Delete"
                  class="w-full !h-full !border-dashed"
                />
              </el-col>
            </el-row>
          </el-card>
          <!-- Link -->
          <LinkEditor
            v-if="data.content[idx].type === 'link'"
            :template-path="templatePath"
            v-model="data.content[idx]"
          >
            <template #append>
              <el-button
                @click="removeContent(data.content[idx])"
                :icon="Minus"
                class="!m-0 !p-0 !mr-2"
              />
            </template>
          </LinkEditor>
        </template>
        <el-card shadow="never" class="!border-dashed">
          <p>Add a</p>
          <el-row>
            <el-col :span="16">
              <el-select v-model="addType" placeholder="Select">
                <el-option
                  v-for="item in addOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="8"><el-button :icon="Plus" @click="addContent(addType)" class="w-full">Add</el-button></el-col>
          </el-row>
        </el-card>
      </el-space>
    </template>
  </el-card>
</template>

<style scoped></style>
