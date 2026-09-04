<template>
  <div ref="dropdownRef" class="relative flex items-center w-full sm:w-auto">
    <!-- 左侧：下载按钮 -->
    <div
      @click="downloadDefault"
      class="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-l-full rounded-r-none bg-border-green text-black font-semibold shadow-lg transition-all dbtn-main"
      :class="stableFullAvailable
        ? 'cursor-pointer hover:brightness-110 active:brightness-90'
        : 'opacity-50 cursor-not-allowed'"
    >
      <Icon name="lucide:download" class="w-5 h-5 dbtn-icon-lg" />
      <div class="flex flex-col items-start">
        <span class="text-sm font-semibold dbtn-title">{{ buttonText }}</span>
        <span v-if="showVersion" class="text-xs text-gray-900 opacity-80 dbtn-sub">{{
          versionText
        }}</span>
      </div>
    </div>

    <!-- 右侧：更多入口。传 moreTo 时跳转（如下载页），否则展开渠道下拉菜单 -->
    <NuxtLink
      v-if="moreTo"
      :to="moreTo"
      title="更多下载选项"
      class="self-stretch px-3 pr-4 rounded-r-full rounded-l-none cursor-pointer bg-border-green hover:brightness-110 active:brightness-90 text-black font-semibold shadow-lg border-l border-black/20 flex items-center transition-all dbtn-more"
    >
      <Icon name="lucide:ellipsis" class="w-4 h-4 dbtn-icon-sm" />
    </NuxtLink>
    <div
      v-else
      @click="toggleDropdown"
      class="self-stretch px-3 pr-4 rounded-r-full rounded-l-none cursor-pointer bg-border-green hover:brightness-110 active:brightness-90 text-black font-semibold shadow-lg border-l border-black/20 flex items-center transition-all dbtn-more"
    >
      <Icon
        name="lucide:chevron-down"
        class="w-4 h-4 dbtn-icon-sm transition-transform"
        :class="{ 'rotate-180': showDropdown }"
      />
    </div>

    <!-- 下拉菜单 -->
    <transition v-if="!moreTo" name="dropdown">
      <div
        v-show="showDropdown"
        class="absolute top-full right-0 sm:left-0 mt-2 bg-dark-light border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50 min-w-[200px]"
      >
        <!-- 稳定版 -->
        <div class="px-3 py-2 text-xs text-gray-500 border-b border-gray-700">
          稳定版 v{{ stableVersion || '…' }}
        </div>
        <button
          @click="downloadStableFull"
          :disabled="!stableFullAvailable"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent"
        >
          <span class="flex-1">完整版</span>
          <span v-if="stableFullAvailable" class="text-xs text-gray-400">推荐</span>
          <span v-else class="text-xs text-gray-500">不可用</span>
        </button>
        <button
          @click="downloadStableLite"
          :disabled="!stableLiteAvailable"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent"
        >
          <span class="flex-1">精简版</span>
          <span v-if="stableLiteAvailable" class="text-xs text-gray-400">去除非必要组件</span>
          <span v-else class="text-xs text-gray-500">不可用</span>
        </button>
        <!-- 测试版 -->
        <div
          v-if="devVersion"
          class="px-3 py-2 text-xs text-gray-500 border-t border-b border-gray-700"
        >
          测试版 v{{ devVersion }}
        </div>
        <button
          v-if="devVersion"
          @click="downloadDevFull"
          :disabled="!devFullAvailable"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent"
        >
          <span class="flex-1">完整版</span>
          <span v-if="devFullAvailable" class="text-xs text-yellow-500">测试</span>
          <span v-else class="text-xs text-gray-500">不可用</span>
        </button>
        <button
          v-if="devVersion"
          @click="downloadDevLite"
          :disabled="!devLiteAvailable"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent"
        >
          <span class="flex-1">精简版</span>
          <span v-if="devLiteAvailable" class="text-xs text-yellow-500">测试</span>
          <span v-else class="text-xs text-gray-500">不可用</span>
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: "立即下载",
  },
  showVersion: {
    type: Boolean,
    default: true,
  },
  // 右侧"更多"入口的行为：传入路由地址则跳转，否则展开渠道下拉菜单
  moreTo: {
    type: String,
    default: null,
  },
})

const showDropdown = ref(false)
const dropdownRef = ref(null)

const { latestVersion, latestDevVersion, data } = useVersionData()

const stableVersion = latestVersion
const devVersion = latestDevVersion

// 某版本的指定渠道是否提供下载（update.json 对应版本的 downloads 中存在且带 url）
const hasChannel = (version, channel) => {
  const downloads = version ? data.value.versions?.[version]?.downloads : null
  return (
    Array.isArray(downloads) &&
    downloads.some((item) => item.channel === channel && item.url)
  )
}

const stableFullAvailable = computed(() => hasChannel(stableVersion.value, "default"))
const stableLiteAvailable = computed(() => hasChannel(stableVersion.value, "lite"))
const devFullAvailable = computed(() => hasChannel(devVersion.value, "default"))
const devLiteAvailable = computed(() => hasChannel(devVersion.value, "lite"))

const versionText = computed(() => {
  if (stableVersion.value) {
    return `v${stableVersion.value} 完整版`
  }
  return "完整版"
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

// 跳转到感谢页，由页面自动触发下载并展示校验和等信息
const goToThankYou = (version, channel) => {
  showDropdown.value = false
  navigateTo({
    path: "/download/thank-you",
    query: { version: version || "", channel },
  })
}

const downloadDefault = () => {
  if (!stableFullAvailable.value) return
  downloadStableFull()
}

const downloadStableFull = () => {
  if (!stableFullAvailable.value) return
  goToThankYou(stableVersion.value, "default")
}

const downloadStableLite = () => {
  if (!stableLiteAvailable.value) return
  goToThankYou(stableVersion.value, "lite")
}

const downloadDevFull = () => {
  if (!devFullAvailable.value) return
  goToThankYou(devVersion.value, "default")
}

const downloadDevLite = () => {
  if (!devLiteAvailable.value) return
  goToThankYou(devVersion.value, "lite")
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
