<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">下载镜像</h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        官方下载或 GitHub 访问不畅时，可通过镜像站点下载
      </p>
    </div>

    <div
      class="bg-dark-light rounded-2xl border border-gray-800 p-8 text-center mb-8"
    >
      <Icon name="lucide:server-off" class="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-white mb-2">暂无可用镜像</h2>
      <p class="text-gray-400 text-sm max-w-md mx-auto">
        镜像站点正在建设中。当前请通过官方渠道下载，
        或直接前往 GitHub Releases 获取全部版本。
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <NuxtLink to="/download" class="btn-primary text-sm">
          返回下载页
        </NuxtLink>
        <a
          href="https://github.com/hxabcd/EasiAuto/releases"
          target="_blank"
          rel="noopener"
          class="btn-secondary text-sm inline-flex items-center justify-center gap-2"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
          GitHub Releases
        </a>
      </div>
    </div>

    <div
      class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3"
    >
      <Icon
        name="lucide:triangle-alert"
        class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5"
      />
      <p class="text-sm text-yellow-200/80 leading-relaxed">
        请注意甄别来源。EasiAuto 的官方发布渠道仅为本网站与
        <a
          href="https://github.com/hxabcd/EasiAuto/releases"
          target="_blank"
          rel="noopener"
          class="underline underline-offset-2"
          >GitHub Releases</a
        >，其他来源的文件安全性无法保证。下载后建议校验 SHA256。
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({ title: '下载镜像' })
useSeoMeta({
  description: 'EasiAuto 官方下载镜像站点列表。',
})
</script>
