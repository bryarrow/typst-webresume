<script setup lang="ts">
import { PlainText } from '@/utils/template/template-data/data.ts'
import { useSlots } from 'vue'

const data = defineModel<PlainText>({ required: true })
const { rich = false } = defineProps<{ rich?: boolean }>()
const slots = useSlots()
</script>

<template>
  <el-input
    v-if="rich"
    v-model="data.value"
    :autosize="{ minRows: 2 }"
    type="textarea"
  />
  <el-input v-else v-model="data.value" placeholder="Typst Text">
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
  </el-input>
</template>

<style scoped></style>
