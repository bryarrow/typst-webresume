<script setup lang="ts">
import { TypstDocument } from '@myriaddreamin/typst.vue3'

interface prop {
  artifact: Uint8Array
}

const { artifact = new Uint8Array(0) } = defineProps<prop>()

</script>

<template>
  <div class="typst-preview h-full">
    <el-scrollbar>
      <TypstDocument :artifact="artifact" />
    </el-scrollbar>
  </div>
</template>

<style lang="css" scoped>
.typst-preview {
  padding: 2em;
  background-color: #e4e5ea;
  border-radius: 6px;
}
.typst-preview :deep(svg) {
  width: 100% !important;
  height: 100% !important;
  background: white;
  box-shadow: 0 4px 12px rgba(89, 85, 101, 0.2);
}
</style>
