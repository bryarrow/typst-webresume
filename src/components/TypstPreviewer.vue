<script setup lang="ts">
import { TypstDocument } from '@myriaddreamin/typst.vue3'

interface prop {
  artifact: Uint8Array
  isLoading: boolean
}

const { artifact = new Uint8Array(0), isLoading=true } = defineProps<prop>()
</script>

<template>
  <div
    class="typst-preview h-[98%] p-4 bg-[rgba(228,229,234,1)] dark:bg-[rgba(59,58,72,1)] mx-2 rounded shadow"
  >
    <el-scrollbar v-loading="isLoading">
      <TypstDocument :artifact="artifact" />
    </el-scrollbar>
  </div>
</template>

<style lang="css" scoped>
.typst-preview :deep(svg:not(.circular)) {
  width: 100% !important;
  height: 100% !important;
  background: white;
  box-shadow: 0 4px 12px rgba(89, 85, 101, 0.2);
}
</style>
