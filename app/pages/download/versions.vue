<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">版本历史</h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        全部版本的更新日志与下载链接
      </p>
    </div>

    <div v-if="sortedVersions.length === 0" class="text-center text-gray-400 py-20">暂无版本数据</div>

    <div v-else class="space-y-6">
      <VersionCard
        v-for="[version, info] in sortedVersions"
        :key="version"
        :version="version"
        :info="info"
        :is-latest="version === latestVersion"
        :is-latest-dev="version === latestDevVersion"
      />
    </div>
  </div>
</template>

<script setup>
useHead({ title: '版本历史' })
useSeoMeta({
  description: 'EasiAuto 全部版本的更新日志、亮点功能与各渠道下载链接。',
})

const { latestVersion, latestDevVersion, sortedVersions } = useVersionData()
</script>
