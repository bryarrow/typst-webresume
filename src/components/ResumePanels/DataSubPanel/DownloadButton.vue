<script setup lang="ts">
import { useProjectsStore } from '@/store/projects-store.ts'
import { Download } from '@element-plus/icons-vue'

const projectsStore = useProjectsStore()
const { fileName = 'resume.pdf' } = defineProps<{ fileName?: string }>()

const downloadPdf = async (fileName: string = 'resume.pdf') => {
  if (
    !(
      projectsStore.activeProjectID &&
      projectsStore.isActiveAndPrepared(projectsStore.activeProjectID)
    )
  ) {
    console.warn('No active project. Failed to generate PDF')
    return
  }
  const pdfData = await projectsStore.activeProject?.compilePDF()
  if (!pdfData) {
    console.warn('Failed to generate PDF')
    return
  }

  const pdfDataCopy = new Uint8Array(pdfData.length)
  pdfDataCopy.set(pdfData)

  const pdfFile = new Blob([pdfDataCopy], { type: 'application/pdf' })

  // Creates element with <a> tag
  const link = document.createElement('a')
  // Sets file content in the object URL
  link.href = URL.createObjectURL(pdfFile)
  // Sets file name
  link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`
  // Triggers a click event to <a> tag to save file.
  link.click()
  URL.revokeObjectURL(link.href)
}
</script>

<template>
  <el-button @click="downloadPdf(fileName)" :icon="Download">Download PDF</el-button>
</template>

<style scoped></style>
