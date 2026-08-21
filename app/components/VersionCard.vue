<template>
  <div
    class="bg-dark-light rounded-2xl border border-gray-800 p-6 md:p-8 animate-on-scroll"
  >
    <!-- 版本头 -->
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <h3 class="text-2xl font-bold text-white">v{{ version }}</h3>
      <span
        v-if="isLatest"
        class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary"
      >
        最新稳定版
      </span>
      <span
        v-else-if="isLatestDev"
        class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-500"
      >
        最新测试版
      </span>
      <span
        v-else-if="info.is_dev"
        class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-700 text-yellow-500"
      >
        测试版
      </span>
      <span
        v-else
        class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-700 text-gray-300"
      >
        稳定版
      </span>
    </div>

    <p v-if="info.description" class="text-gray-400 mb-4">
      {{ info.description }}
    </p>

    <!-- 亮点功能 -->
    <div
      v-if="info.highlights && info.highlights.length"
      class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
    >
      <div
        v-for="highlight in info.highlights"
        :key="highlight.name"
        class="bg-dark rounded-xl border border-gray-800 p-4"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <Icon
            name="lucide:sparkles"
            class="w-4 h-4 text-primary shrink-0"
          />
          <span class="font-semibold text-title-green">{{ highlight.name }}</span>
        </div>
        <p class="text-sm text-gray-400">{{ highlight.description }}</p>
      </div>
    </div>

    <!-- 其他变更 -->
    <ul
      v-if="info.others && info.others.length"
      class="space-y-1.5 text-gray-400 text-sm mb-5"
    >
      <li
        v-for="change in info.others"
        :key="change"
        class="flex items-start gap-2"
      >
        <span class="text-gray-600 mt-1">•</span>
        {{ change }}
      </li>
    </ul>

    <!-- 下载渠道 -->
    <div v-if="downloads.length" class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="download in downloads"
        :key="download.channel"
        :to="{
          path: '/download/thank-you',
          query: { version, channel: download.channel },
        }"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-medium transition-colors"
        :title="download.sha256 ? `SHA256: ${download.sha256}` : ''"
      >
        <Icon name="lucide:download" class="w-4 h-4" />
        {{ channelLabel(download.channel) }}
      </NuxtLink>
    </div>
    <p v-else class="text-gray-500 text-sm">
      此版本暂无下载链接，请在
      <a
        href="https://github.com/hxabcd/EasiAuto/releases"
        target="_blank"
        rel="noopener"
        class="text-primary hover:text-primary-light transition-colors"
        >GitHub Releases</a
      >
      查看。
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  version: {
    type: String,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
  isLatest: {
    type: Boolean,
    default: false,
  },
  isLatestDev: {
    type: Boolean,
    default: false,
  },
})

const downloads = computed(() =>
  Array.isArray(props.info.downloads) ? props.info.downloads : []
)

const channelLabel = (channel) => CHANNEL_LABELS[channel] || channel
</script>
