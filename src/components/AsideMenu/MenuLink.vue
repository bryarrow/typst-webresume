<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  isExtending: boolean
  text: string
}>()
</script>

<template>
  <RouterLink :to=to class="flex items-center min-h-[44px]" :class="{'flex-col':!isExtending, '!ml-4':isExtending}" style="margin-top: 1rem">
    <el-icon :size="20"><slot></slot></el-icon>
    <p class="truncate whitespace-nowrap">{{text}}</p>
  </RouterLink>
</template>

<style scoped></style>
