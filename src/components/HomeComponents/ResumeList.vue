<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/store/projects-store.ts'
import ResumeItem from '@/components/HomeComponents/ResumeItem.vue'
import { ref } from 'vue'
import { getAllTemplatesInfo } from '@/utils/template/get-info/template.ts'

const { allProjectsData } = storeToRefs(useProjectsStore())
const projectsStore = useProjectsStore()
const newProject = (projectName?: string, template?: string) => {
  projectsStore.addProject(
    projectName ?? `resume-${Object.keys(projectsStore.allProjectsData).length + 1}`,
    template ?? 'typsume-cv-miku',
  )
}

const addDialogVisible = ref<boolean>(false)
const addName = ref<string | undefined>()
const addTemplate = ref<string | undefined>()
const templates = Object.keys(getAllTemplatesInfo().templates)
</script>

<template>
  <div class="resume-list m-3">
    <el-row justify="space-between" class="px-3">
      <el-col :span="10" class="text-bold">Project Name</el-col>
      <el-col :span="1" class="flex justify-end">
        <el-button @click="addDialogVisible = true" class="w-full">New</el-button>
      </el-col>
    </el-row>
    <el-divider class="!my-3" />
    <el-empty v-if="Object.keys(allProjectsData).length === 0" description="No Resumes" />
    <el-space direction="vertical" fill="fill" class="w-full">
      <template v-for="project in Object.values(allProjectsData)" :key="project.id">
        <ResumeItem :project-name="project.name" :projectID="project.id" />
      </template>
    </el-space>
    <el-dialog v-model="addDialogVisible">
      <el-form>
        <el-form-item label="Name">
          <el-input v-model="addName" />
        </el-form-item>
        <el-form-item label="Template">
          <el-select v-model="addTemplate" placeholder="Select Template">
            <el-option v-for="item in templates" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              newProject(addName, addTemplate);
              addDialogVisible = false
            "
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
