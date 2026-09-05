<template>
  <div>
    <div class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">EasiAuto 文档</h1>
      <p class="text-gray-400 text-lg max-w-2xl">
        这里是 EasiAuto 的使用文档——从下载安装到各种登录方式的详细说明。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <NuxtLink
        v-for="section in sections"
        :key="section.title"
        :to="section.to"
        class="group bg-dark-light rounded-2xl border border-gray-800 p-8 hover:border-primary/40 transition-colors"
      >
        <div
          class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
        >
          <Icon :name="section.icon" class="w-6 h-6 text-primary" />
        </div>
        <h2 class="text-xl font-semibold text-white mb-2">{{ section.title }}</h2>
        <p class="text-gray-400 text-sm mb-4">{{ section.description }}</p>
        <span
          class="text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          开始阅读 <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </span>
      </NuxtLink>
    </div>

    <div
      class="bg-dark rounded-2xl border border-gray-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="text-gray-400 text-sm">
        没有找到想了解的内容？欢迎在 GitHub Issues 中提问。
      </p>
      <a
        href="https://github.com/hxabcd/EasiAuto/issues"
        target="_blank"
        class="btn-secondary text-sm inline-flex items-center gap-2 shrink-0"
      >
        <Icon name="simple-icons:github" class="w-4 h-4" />
        前往 Issues
      </a>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'docs' })

useHead({ title: '文档' })
useSeoMeta({
  description: 'EasiAuto 使用文档——快速上手、登录方式详解与常见问题。',
})

const sections = [
  {
    icon: 'lucide:rocket',
    title: '快速上手',
    description: '从下载安装到完成第一次自动登录，几步上手 EasiAuto。',
    to: '/docs/get-started',
  },
  {
    icon: 'lucide:book-open',
    title: '应用帮助',
    description: '四种登录方式的详细说明、二维码登录与自动更新。',
    to: '/docs/app',
  },
]
</script>
