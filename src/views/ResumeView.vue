<script setup lang="ts">
import { $typst } from '@myriaddreamin/typst.ts'
import TypstPreviewer from '@/components/TypstPreviewer.vue'
import { ref } from 'vue'

const sourceCode = '= Hello World!\nThis is a typst document compiled in browser.\n\n#lorem(900)'

const artifact = ref(new Uint8Array(0))
$typst.vector({ mainContent: sourceCode }).then((value) => {
  if (value) artifact.value = value
})

</script>

<template>
  <el-splitter>
    <el-splitter-panel></el-splitter-panel>
    <el-splitter-panel>
      <TypstPreviewer :artifact="artifact"></TypstPreviewer>
    </el-splitter-panel>
    <el-splitter-panel collapsible></el-splitter-panel>
  </el-splitter>
</template>
