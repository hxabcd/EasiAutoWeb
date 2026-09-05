<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-12 animate-on-scroll">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">下载 EasiAuto</h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        选择适合你的版本
      </p>
    </div>

    <!-- 主下载区域：分支选择 + 下载按钮 + 系统要求 -->
    <div class="flex flex-col items-center mb-12">
      <div class="w-full flex justify-center animate-on-scroll animate-delay-100">
        <DownloadPanel />
      </div>

      <div
        class="flex flex-wrap items-center justify-center gap-2 mt-8 animate-on-scroll animate-delay-200"
      >
        <span class="text-xs text-gray-600 tracking-widest mr-1">系统要求</span>
        <div
          v-for="req in requirements"
          :key="req.title"
          :title="req.description"
          class="flex items-center gap-1.5 rounded-full border border-gray-800 px-3.5 py-1.5 bg-dark/40 transition-colors hover:border-gray-600"
        >
          <Icon
            :name="req.icon"
            class="w-3.5 h-3.5 shrink-0"
            :class="req.optional ? 'text-gray-600' : 'text-primary'"
          />
          <span
            class="text-xs"
            :class="req.optional ? 'text-gray-500' : 'text-gray-300'"
          >
            {{ req.title }}{{ req.optional ? '（可选）' : '' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 其他下载入口 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NuxtLink
        to="/download/versions"
        class="group bg-dark rounded-2xl border border-gray-800 p-6 card-hover animate-on-scroll animate-delay-300"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon name="lucide:history" class="w-5 h-5 text-primary" />
          <h3 class="font-semibold text-white">全部版本</h3>
        </div>
        <p class="text-sm text-gray-400 mb-3">
          查看版本历史与更新日志，下载历史版本
        </p>
        <span
          class="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          前往查看 <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </span>
      </NuxtLink>

      <a
        href="https://github.com/hxabcd/EasiAuto/releases"
        target="_blank"
        rel="noopener"
        class="group bg-dark rounded-2xl border border-gray-800 p-6 card-hover animate-on-scroll animate-delay-400"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon name="simple-icons:github" class="w-5 h-5 text-primary" />
          <h3 class="font-semibold text-white">GitHub Releases</h3>
        </div>
        <p class="text-sm text-gray-400 mb-3">在 GitHub 上查看全部发布与下载</p>
        <span
          class="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          前往查看 <Icon name="lucide:external-link" class="w-4 h-4" />
        </span>
      </a>

      <NuxtLink
        to="/download/mirrors"
        class="group bg-dark rounded-2xl border border-gray-800 p-6 card-hover animate-on-scroll animate-delay-500"
      >
        <div class="flex items-center gap-2 mb-2">
          <Icon name="lucide:server" class="w-5 h-5 text-primary" />
          <h3 class="font-semibold text-white">下载镜像</h3>
        </div>
        <p class="text-sm text-gray-400 mb-3">
          官方下载不可用时，可尝试镜像站点
        </p>
        <span
          class="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          前往查看 <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({ title: '下载' })
useSeoMeta({
  description:
    '下载 EasiAuto——自动登录希沃白板的小工具。支持稳定版与测试版，1.3.0 起统一为单一版本，无需选择分支。',
})

const requirements = [
  {
    icon: 'lucide:monitor',
    title: 'Windows 10 及以上',
    description: '需要 Windows 10 或更高版本的 64 位系统',
    optional: false,
  },
  {
    icon: 'lucide:presentation',
    title: '希沃白板',
    description: '需已安装希沃白板（EasiNote）并完成基础配置',
    optional: false,
  },
  {
    icon: 'lucide:calendar-clock',
    title: 'ClassIsland',
    description: '可选安装，配合 ClassIsland 实现上课自动登录',
    optional: true,
  },
]
</script>

<style scoped>
/* 下载页动画节奏略快于全局默认（0.6s） */
.animate-on-scroll {
  transition-duration: 0.45s;
}

.animate-delay-100 { transition-delay: 0.07s; }
.animate-delay-200 { transition-delay: 0.14s; }
.animate-delay-300 { transition-delay: 0.21s; }
.animate-delay-400 { transition-delay: 0.28s; }
.animate-delay-500 { transition-delay: 0.35s; }
</style>
