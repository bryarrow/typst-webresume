<template>
  <TypstPreviewer :artifact="artifact"></TypstPreviewer>
</template>

<script setup lang="ts">
import { $typst } from '@myriaddreamin/typst.ts'
import TypstPreviewer from '@/components/TypstPreviewer.vue'
import { ref } from 'vue'

const sourceCode = '= Hello World!\nThis is a typst document compiled in browser.'

const artifact = ref(new Uint8Array(0))
$typst.vector({ mainContent: sourceCode }).then((value) => {
  if (value) artifact.value = value
})

</script>
