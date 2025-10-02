<script setup lang="ts">
import { DatedBlock, PlainText } from '@/utils/template/template-data/data.ts'
import PlainEditor from '@/components/ResumePanels/Editors/PlainEditor.vue'
import { ref, watch } from 'vue'

const data = defineModel<DatedBlock>({ required: true })
const dateMode = ref<'date' | 'text'>('text')
const dateModeOptions = ['date', 'text']

// 这里这样写是因为会Data在序列化之后丢失方法，原来的data getter和setter就不那么好用
const dateStart = ref(new Date())
const dateEnd = ref(new Date())
const dateText = ref<PlainText>(new PlainText(data.value.data.value))
watch([dateStart, dateEnd], ([start, end]) => {
  if (start.getTime() === end.getTime()) {
    dateText.value = new PlainText(start.toDateString())
  } else {
    dateText.value = new PlainText(start.toDateString() + ' --- ' + end.toDateString())
  }
})
watch(
  dateText,
  (value) => {
    data.value.data = value
  },
  { deep: true },
)
</script>

<template>
  <el-row :gutter="5">
    <!-- Title Input -->
    <el-col :span="12">
      <el-row class="border-1 border-solid border-[#e4e7ed] dark:border-[#414243] rounded p-1">
        <el-col>Title</el-col>
        <el-col><PlainEditor v-model="data.term" rich /> </el-col>
      </el-row>
    </el-col>
    <!-- Date Input -->
    <el-col :span="12">
      <el-row
        class="border-1 border-solid border-[#e4e7ed] dark:border-[#414243] rounded p-1 h-full"
      >
        <el-col>
          <el-row>
            <el-col :span="8">Date</el-col>
            <el-col :span="16" class="!flex justify-end min-w-[81px]">
              <el-segmented v-model="dateMode" :options="dateModeOptions" size="small" />
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row v-if="dateMode === 'date'">
            <el-col><el-date-picker size="small" class="!w-full" v-model="dateStart" /></el-col>
            <el-col><el-date-picker size="small" class="!w-full" v-model="dateEnd" /></el-col>
          </el-row>
          <PlainEditor v-if="dateMode === 'text'" v-model="dateText" rich />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped></style>
