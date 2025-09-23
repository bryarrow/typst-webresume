<script setup lang="ts">
import { $typst } from '@myriaddreamin/typst.ts'
import TypstPreviewer from '@/components/TypstPreviewer.vue'
import { ref } from 'vue'
import DataPanel from '@/components/DataPanel.vue'
import StylePanel from '@/components/StylePanel.vue'

const sourceCode =
  '= Hello World!\nThis is a typst document compiled in browser.\n\n$\na_b=sum^c\n$\n\n#lorem(900)'

const artifact = ref(new Uint8Array(0))
$typst.vector({ mainContent: sourceCode }).then((value) => {
  if (value) artifact.value = value
})
</script>

<template>
  <el-splitter>
    <el-splitter-panel>
      <DataPanel />
    </el-splitter-panel>
    <el-splitter-panel>
      <TypstPreviewer :artifact="artifact" />
    </el-splitter-panel>
    <el-splitter-panel collapsible>
      <StylePanel />
    </el-splitter-panel>
  </el-splitter>
</template>
