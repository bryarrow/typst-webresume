<script setup lang="ts">
import { $typst } from '@myriaddreamin/typst.ts'
import TypstPreviewer from '@/components/TypstPreviewer.vue'
import { onMounted,  ref } from 'vue'
import DataPanel from '@/components/DataPanel.vue'
import StylePanel from '@/components/StylePanel.vue'
import { loadWithDefault } from '@/utils/template/load/template.ts'

const artifact = ref<Uint8Array>(new Uint8Array())

onMounted(async () => {
  const { templateMeta } = await loadWithDefault('typsume-cv-miku')
  const vector = await $typst.vector({ root: '/', mainFilePath: templateMeta.main })
  if (vector) {
    artifact.value = vector
  }
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
