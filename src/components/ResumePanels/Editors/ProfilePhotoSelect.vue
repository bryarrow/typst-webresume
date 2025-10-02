<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="addPhotoToActive"
  >
    <el-image v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar image" fit="scale-down" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadRequestOptions } from 'element-plus'
import { useProjectsStore } from '@/store/projects-store.ts'
import { digestToHex } from '@/utils/digsest-hex.ts'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (_, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const addPhotoToActive = async (options: UploadRequestOptions) => {
  const projectStore = useProjectsStore()
  if (projectStore.activeProject?.data){
    const raw = new Uint8Array(await options.file.arrayBuffer())
    const path = `/assets/imgs/profile-photo-${await digestToHex('SHA-1', raw)}.jpg`
    await projectStore.activeProject.addPhoto(path, raw)
    projectStore.activeProject.data.author.photoUrl = path
  }
  else throw Error('No active project')
}
</script>

<style scoped>
.avatar-uploader .avatar {
  height: 158px;
  width: 108px;
  display: block;
}
</style>

<!--suppress CssUnusedSymbol -->
<style>
.avatar-uploader .el-upload {
  height: 158px;
  width: 108px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
