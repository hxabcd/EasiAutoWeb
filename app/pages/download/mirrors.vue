<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">下载镜像</h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        官方下载或 GitHub 访问不畅时，可通过镜像站点下载
      </p>
    </div>

    <!-- 版本与渠道选择 -->
    <div class="bg-dark-light rounded-2xl border border-gray-800 p-6 mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">选择版本</label>
          <select
            v-model="selectedVersion"
            class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 focus:border-primary focus:outline-none cursor-pointer"
          >
            <option v-for="v in versions" :key="v" :value="v">
              v{{ v }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">选择渠道</label>
          <select
            v-model="selectedChannel"
            class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 focus:border-primary focus:outline-none cursor-pointer"
          >
            <option v-for="ch in channels" :key="ch.channel" :value="ch.channel">
              {{ ch.label }}
            </option>
          </select>
        </div>
      </div>

      <p v-if="!entry" class="text-sm text-gray-500 mt-4">
        该版本暂无可用下载链接。
      </p>

      <!-- 校验和 -->
      <div v-else-if="entry.sha256" class="mt-4">
        <label class="block text-sm text-gray-400 mb-2">SHA256 校验和</label>
        <div class="relative">
          <input
            type="text"
            :value="entry.sha256"
            readonly
            class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 font-mono pr-20"
          />
          <button
            @click="copySha256"
            class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-sm rounded-md transition-colors flex items-center gap-1.5"
          >
            <Icon v-if="copied" name="lucide:check" class="w-4 h-4" />
            <Icon v-else name="lucide:copy" class="w-4 h-4" />
            {{ copied ? '已复制' : '复制' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 镜像列表 -->
    <div v-if="entry" class="space-y-4 mb-8">
      <div
        v-for="mirror in mirrors"
        :key="mirror.name"
        class="flex flex-col sm:flex-row sm:items-center gap-4 bg-dark rounded-2xl border border-gray-800 p-6 card-hover"
      >
        <div class="flex items-center gap-3 flex-1">
          <Icon :name="mirror.icon" class="w-6 h-6 text-primary shrink-0" />
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="font-semibold text-white">{{ mirror.name }}</h2>
              <span class="text-xs text-gray-500 font-mono">{{
                mirror.domain
              }}</span>
            </div>
            <p class="text-sm text-gray-400 mt-0.5">{{ mirror.description }}</p>
          </div>
        </div>
        <a
          :href="mirrorUrl(mirror)"
          target="_blank"
          rel="noopener"
          class="btn-primary text-sm inline-flex items-center justify-center gap-2 shrink-0"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          下载
        </a>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-gray-800 p-8 text-center mb-8">
      <Icon name="lucide:server-off" class="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-white mb-2">暂无可用镜像</h2>
      <p class="text-gray-400 text-sm max-w-md mx-auto">
        当前镜像仅支持提供下载链接的版本。请返回下载页选择可下载的版本。
      </p>
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
  description: 'EasiAuto 官方下载镜像站点列表，支持 ghproxy 与 ghfast 加速下载。',
})

const { data, latestVersion } = useVersionData()

// 镜像域名以此前缀拼接原始 GitHub 下载链接
const mirrors = [
  {
    name: 'ghproxy',
    domain: 'https://ghproxy.net/',
    description: 'GitHub 国内镜像',
    icon: 'lucide:github',
  },
  {
    name: 'ghfast',
    domain: 'https://ghfast.top/',
    description: 'GitHub 国内镜像',
    icon: 'lucide:zap',
  },
]

// 按版本号降序（最新在前）的可用版本列表
const versions = computed(() =>
  Object.keys(data.value.versions || {}).sort((a, b) => compareVersions(b, a))
)

const selectedVersion = ref(latestVersion.value || '')
const selectedChannel = ref('default')

const channels = computed(() => {
  const downloads = data.value.versions?.[selectedVersion.value]?.downloads
  if (!Array.isArray(downloads)) return []
  return downloads.map((item) => ({
    channel: item.channel,
    label: channelLabel(item.channel, selectedVersion.value),
  }))
})

const entry = computed(() => {
  const downloads = data.value.versions?.[selectedVersion.value]?.downloads
  if (!Array.isArray(downloads)) return null
  return downloads.find((item) => item.channel === selectedChannel.value) || null
})

const mirrorUrl = (mirror) =>
  entry.value?.url ? `${mirror.domain}${entry.value.url}` : ''

// 切换版本时，将渠道重置为该版本第一个可用的渠道
watch(
  selectedVersion,
  () => {
    const first = channels.value[0]
    if (first && first.channel !== selectedChannel.value) {
      selectedChannel.value = first.channel
    }
  },
  { immediate: true }
)

const copied = ref(false)
let copiedTimer = null

const copySha256 = async () => {
  if (!entry.value?.sha256) return
  try {
    await navigator.clipboard.writeText(entry.value.sha256)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onUnmounted(() => {
  clearTimeout(copiedTimer)
})
</script>
