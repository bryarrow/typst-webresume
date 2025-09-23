<script setup lang="ts">
import { RouterView } from 'vue-router'
import AsideMenu from '@/components/AsideMenu/AsideMenu.vue'

</script>

<template>
  <el-container class="bg-gray-100 dark:bg-black h-screen">
    <el-header class="bg-transparent !h-0 md:!h-[5vh]"></el-header>
    <div class="md:hidden bg-white dark:bg-black h-15 w-full"></div>
    <el-container class="h-full md:h-[95vh]">
      <AsideMenu />
      <el-main
        class="!p-0 !overflow-hidden"
        :class="{
          'bg-white dark:bg-[rgba(59,58,72,1)] md:shadow-2xl md:rounded-tl-xl md:rounded-bl-xl':
            $route.path == '/',
        }"
      >
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
