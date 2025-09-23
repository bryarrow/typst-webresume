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

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
