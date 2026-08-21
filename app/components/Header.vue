<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧：Logo + 导航 -->
        <div class="flex items-center gap-6 lg:gap-8 min-w-0">
          <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer shrink-0">
            <img
              src="/images/logo.webp"
              alt="EasiAuto Logo"
              class="w-8 h-8 rounded"
            />
            <span class="text-xl font-bold text-white">EasiAuto</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-6 lg:gap-8">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="transition-colors"
              :class="isActive(link.to) ? 'text-primary' : 'text-gray-300 hover:text-primary'"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              href="https://github.com/hxabcd/EasiAuto"
              target="_blank"
              rel="noopener"
              class="text-gray-300 hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              GitHub
            </a>
          </nav>
        </div>

        <!-- 右侧：仅下载按钮 -->
        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/download"
            class="text-sm font-semibold inline-flex items-center gap-2 px-5 py-2 rounded-full bg-border-green hover:opacity-90 text-black shadow-lg transition-all"
          >
            <Icon name="lucide:download" class="w-4 h-4" />
            立即下载
          </NuxtLink>

          <button
            class="md:hidden text-gray-300 hover:text-white transition-colors"
            aria-label="打开菜单"
            @click="menuOpen = !menuOpen"
          >
            <Icon v-if="!menuOpen" name="lucide:menu" class="w-6 h-6" />
            <Icon v-else name="lucide:x" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="menuOpen" class="md:hidden pb-4 flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2.5 rounded-lg transition-colors"
          :class="isActive(link.to) ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-white hover:bg-white/5'"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          href="https://github.com/hxabcd/EasiAuto"
          target="_blank"
          rel="noopener"
          class="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          @click="menuOpen = false"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
          GitHub 仓库
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute()
const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/download', label: '下载' },
  { to: '/docs', label: '文档' },
]

const isActive = (to) => {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>
