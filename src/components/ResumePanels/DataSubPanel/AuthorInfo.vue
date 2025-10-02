<template>
  <el-card shadow="never">
    <h2 class="font-bold text-xl mb-2">Author Info</h2>
    <el-row :gutter="30" align="middle" justify="space-around">
      <el-col :span="6" :xs="24" class="min-w-[108px] justify-items-center-safe"
        ><ProfilePhotoSelect v-model:data="projectData"
      /></el-col>
      <el-col :span="18" :xs="24">
        <el-row class="font-semibold"><el-col>Name: </el-col></el-row>
        <el-row class="font-semibold">
          <el-col> <PlainEditor v-model="projectData.author.authorName"></PlainEditor> </el-col>
        </el-row>
        <el-row><el-col> Political Status: </el-col></el-row>
        <el-row>
          <el-col>
            <PlainEditor
              v-if="projectData.author.politicalStatus"
              v-model="projectData.author.politicalStatus"
            >
              <template #append>
                <el-button :icon="Minus" @click="removePoliticalStatus"></el-button>
              </template>
            </PlainEditor>
            <el-button
              v-else
              class="w-full !border-dashed"
              :icon="Plus"
              @click="addPoliticalStatus"
            />
          </el-col>
        </el-row>
        <el-row><el-col> Email: </el-col></el-row>
        <el-row>
          <el-col>
            <LinkEditor v-model="projectData.author.contacts.email" :template-path="templatePath" />
          </el-col>
        </el-row>
        <el-row><el-col>Phone: </el-col></el-row>
        <el-row>
          <el-col><PlainEditor v-model="projectData.author.contacts.phone" /></el-col>
        </el-row>
      </el-col>
    </el-row>
    <template v-for="idx in projectData.author.otherInfos.keys()" :key="idx">
      <el-row class="my-2">
        <el-col>
          <LinkEditor :template-path="templatePath" v-model="projectData.author.otherInfos[idx]">
            <template #append>
              <el-button
                @click="removeOtherInfo(projectData.author.otherInfos[idx])"
                :icon="Minus"
                class="!m-0 !p-0 !mr-2"
              />
            </template>
          </LinkEditor>
        </el-col>
      </el-row>
    </template>
    <el-row class="my-2">
      <el-col>
        <el-button @click="addOtherInfo" :icon="Plus" class="w-full !border-dashed">
          Add Info
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { type Data, Link, PlainText } from '@/utils/template/template-data/data.ts'
import ProfilePhotoSelect from '@/components/ResumePanels/Editors/ProfilePhotoSelect.vue'
import PlainEditor from '@/components/ResumePanels/Editors/PlainEditor.vue'
import LinkEditor from '@/components/ResumePanels/Editors/LinkEditor.vue'
import { Minus, Plus } from '@element-plus/icons-vue'

const projectData = defineModel<Data>('data', { required: true })
const { templatePath } = defineProps<{ templatePath: string }>()

const addPoliticalStatus = () => {
  if (projectData.value.author.politicalStatus) return
  projectData.value.author.politicalStatus = new PlainText('')
}
const removePoliticalStatus = () => {
  if (projectData.value.author.politicalStatus === null) return
  projectData.value.author.politicalStatus = null
}
const addOtherInfo = () => {
  projectData.value.author.otherInfos.push(new Link())
}
const removeOtherInfo = (target: Link) => {
  projectData.value.author.otherInfos = projectData.value.author.otherInfos.filter((item) => {
    return !(
      item.iconUrl === target.iconUrl &&
      item.linkUrl === target.linkUrl &&
      item.linkText.value === target.linkText.value
    )
  })
}
</script>
