<template>
  <div class="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
    <!-- 分支选择：segmented control -->
    <div
      v-if="devVersion"
      class="relative inline-flex items-center rounded-full border border-gray-800 bg-dark/60 p-1"
    >
      <!-- 滑动指示块 -->
      <div
        class="absolute top-1 bottom-1 left-1 rounded-full bg-dark-light shadow transition-transform duration-200 ease-out"
        :style="{
          width: `calc((100% - 0.5rem) / ${branchOptions.length})`,
          transform: `translateX(${branchIndex * 100}%)`,
        }"
      ></div>
      <button
        v-for="branch in branchOptions"
        :key="branch.key"
        @click="currentBranch = branch.key"
        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 rounded-full px-5 py-1.5 text-sm whitespace-nowrap transition-colors cursor-pointer"
        :class="branch.key === currentBranch
          ? 'text-white'
          : 'text-gray-400 hover:text-gray-200'"
      >
        <Icon
          :name="branch.icon"
          class="w-4 h-4 shrink-0"
          :class="branch.key === currentBranch ? branch.text : 'text-gray-500'"
        />
        {{ branch.label }}
      </button>
    </div>
    <div v-else class="text-sm text-gray-400">
      稳定版 <span class="text-gray-200 font-semibold">v{{ stableVersion || '…' }}</span>
    </div>

    <!-- 两个下载按钮 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <button
        @click="download('default')"
        :disabled="!fullAvailable"
        class="rounded-2xl bg-border-green text-black p-5 shadow-lg transition-all flex items-center gap-4 text-left"
        :class="fullAvailable
          ? 'cursor-pointer hover:brightness-110 active:brightness-90'
          : 'opacity-50 cursor-not-allowed'"
      >
        <Icon name="lucide:download" class="w-6 h-6 shrink-0" />
        <div>
          <div class="font-semibold">完整版</div>
          <div class="text-xs text-gray-900/80">
            {{ fullAvailable ? `v${currentVersion} 推荐，功能完整` : '当前不可用' }}
          </div>
        </div>
      </button>

      <button
        @click="download('lite')"
        :disabled="!liteAvailable"
        class="rounded-2xl border border-primary/40 bg-dark p-5 transition-all flex items-center gap-4 text-left"
        :class="liteAvailable
          ? 'cursor-pointer hover:border-primary hover:bg-primary/10 active:bg-primary/20'
          : 'opacity-50 cursor-not-allowed border-gray-700'"
      >
        <Icon name="lucide:package-open" class="w-6 h-6 shrink-0 text-primary" />
        <div>
          <div class="font-semibold text-primary">精简版</div>
          <div class="text-xs text-gray-400">
            {{ liteAvailable ? '去除非必要组件，体积更小' : '当前不可用' }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
const { latestVersion, latestDevVersion, data } = useVersionData()

const stableVersion = latestVersion
const devVersion = latestDevVersion

const currentBranch = ref('stable')

const isDevBranch = computed(() => currentBranch.value === 'dev')
const branchIndex = computed(() => (isDevBranch.value ? 1 : 0))
const currentVersion = computed(() =>
  isDevBranch.value ? devVersion.value : stableVersion.value
)

const branchOptions = computed(() => {
  const options = [
    { key: 'stable', label: `稳定版 v${stableVersion.value}`, icon: 'lucide:circle-check', text: 'text-primary' },
  ]
  if (devVersion.value) {
    options.push({
      key: 'dev',
      label: `测试版 v${devVersion.value}`,
      icon: 'lucide:flask-conical',
      text: 'text-yellow-500',
    })
  }
  return options
})

// 某版本的指定渠道是否提供下载（update.json 对应版本的 downloads 中存在且带 url）
const hasChannel = (version, channel) => {
  const downloads = version ? data.value.versions?.[version]?.downloads : null
  return (
    Array.isArray(downloads) &&
    downloads.some((item) => item.channel === channel && item.url)
  )
}

const fullAvailable = computed(() => hasChannel(currentVersion.value, 'default'))
const liteAvailable = computed(() => hasChannel(currentVersion.value, 'lite'))

// 跳转到感谢页，由页面自动触发下载并展示校验和等信息
const download = (channel) => {
  if (!hasChannel(currentVersion.value, channel)) return
  navigateTo({
    path: '/download/thank-you',
    query: { version: currentVersion.value || '', channel },
  })
}
</script>
