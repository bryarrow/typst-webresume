<script setup lang="ts">
import { Document, HomeFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import MenuLink from '@/components/AsideMenu/MenuLink.vue'

const isExtending = ref<boolean>(false)
function toHome(){
  window.location.href="/"
}
</script>

<template>
  <div
    class="hidden md:block w-17 transition-all duration-300 ease-in-out"
    :class="{ 'w-100': isExtending }"
    @mouseenter="isExtending = true"
    @mouseleave="isExtending = false"
  >
    <el-aside
      class="bg-transparent flex flex-col items-center !overflow-hidden"
      :class="{ 'items-start': isExtending }"
      width="100%"
    >
      <MenuLink to="/" :is-extending="isExtending" text="Home"><HomeFilled /></MenuLink>
      <MenuLink to="/resume" text="Resume" :is-extending="isExtending"> <Document /> </MenuLink>
    </el-aside>
  </div>
  <el-button circle :icon="HomeFilled" class="md:!hidden fixed top-5 left-3 z-50 !shadow-2xl" @click="toHome()"/>
</template>

<style scoped></style>
