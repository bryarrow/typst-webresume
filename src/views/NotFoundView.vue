<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden px-4">

    <!-- 漂浮背景数字 -->
    <div class="absolute inset-0">
      <span class="floating-number" style="--x:10%; --y:20%; --size:8rem; --delay:0s;"></span>
      <span class="floating-number" style="--x:70%; --y:30%; --size:6rem; --delay:2s;"></span>
      <span class="floating-number" style="--x:50%; --y:70%; --size:10rem; --delay:1s;"></span>
      <span class="floating-number" style="--x:20%; --y:80%; --size:7rem; --delay:3s;"></span>
      <span class="floating-number" style="--x:80%; --y:60%; --size:9rem; --delay:1.5s;"></span>
    </div>

    <!-- 主内容 -->
    <div class="relative z-10 text-center space-y-6">
      <h1 class="text-9xl font-extrabold text-red-500 animate-bounce">404</h1>
      <p class="text-2xl md:text-3xl font-semibold">Oops! 页面未找到</p>
      <p class="text-gray-600 dark:text-gray-400">
        {{ reason || '你访问的页面不存在或已被移除。' }}
      </p>
      <button
        @click="goHome"
        class="mt-4 px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-colors"
      >
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const { reason } = defineProps<{ reason?: string }>()
const router = useRouter()
const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.floating-number {
  position: absolute;
  content: "404";
  font-weight: bold;
  color: rgba(239, 68, 68, 0.2); /* Tailwind red-500 opacity */
  font-size: var(--size, 8rem);
  left: var(--x, 0);
  top: var(--y, 0);
  opacity: 0.3;
  animation: floatUp 8s ease-in-out infinite alternate;
  animation-delay: var(--delay, 0s);
}

@keyframes floatUp {
  0%   { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50%  { transform: translateY(-50px) rotate(10deg); opacity: 0.5; }
  100% { transform: translateY(-100px) rotate(-10deg); opacity: 0.3; }
}
</style>
