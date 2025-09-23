<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import AsideMenu from '@/components/AsideMenu/AsideMenu.vue'

const windowWidth = ref(window.innerWidth)
const showHeader = computed(() => windowWidth.value >= 768)
</script>

<template>
  <el-container class="bg-gray-100 dark:bg-black h-screen">
    <el-header class="bg-transparent" :height="showHeader ? '5vh' : '0px'"></el-header>
    <div class="md:hidden bg-white dark:bg-black h-15 w-full"></div>
    <el-container class="h-full md:h-[95vh]">
      <AsideMenu />
      <el-main
        class="!p-0"
        :class="{
          'bg-white dark:bg-[#3c3c3c] md:shadow-2xl md:rounded-tl-xl md:rounded-bl-xl':
            $route.path == '/',
        }"
      >
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
