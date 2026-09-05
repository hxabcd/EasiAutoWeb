<template>
  <div class="max-w-2xl mx-auto px-4 py-12">
    <ClientOnly>
      <!-- 正常状态 -->
      <template v-if="entry">
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="lucide:download" class="w-8 h-8 text-primary" />
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">感谢下载 !</h1>
          <p class="text-gray-400">
            EasiAuto <span class="text-primary">v{{ version }}</span>
            <span class="text-gray-500"> · {{ channelLabelText }}</span>
          </p>
        </div>

        <!-- 自动下载提示 -->
        <p class="text-center text-sm text-gray-500 mb-8">
          浏览器应已自动开始下载。若没有开始，
          <button
            @click="startDownload"
            class="text-primary hover:text-primary-light transition-colors underline underline-offset-4"
          >
            点击此处重新下载
          </button>
        </p>

        <!-- SHA256 校验和 -->
        <div v-if="entry.sha256" class="mb-6">
          <label class="block text-sm text-gray-400 mb-2"
            >SHA256 校验和</label
          >
          <div class="relative">
            <input
              type="text"
              :value="entry.sha256"
              readonly
              class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 font-mono pr-24"
            />
            <button
              @click="copySha256"
              class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-sm rounded-md transition-colors flex items-center gap-1.5"
            >
              <Icon v-if="copied" name="lucide:check" class="w-4 h-4" />
              <Icon v-else name="lucide:copy" class="w-4 h-4" />
              {{ copied ? "已复制" : "复制" }}
            </button>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 mb-6">暂无校验和</p>

        <!-- 提示文本 -->
        <div
          class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8"
        >
          <div class="flex items-start gap-3">
            <Icon
              name="lucide:triangle-alert"
              class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5"
            />
            <p class="text-sm text-yellow-200/80 leading-relaxed">
              EasiAuto 是便携版软件 ，需要完整解压到文件夹（如
              <code
                class="bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-300 font-mono"
                >D:\EasiAuto</code
              >）才能使用
            </p>
          </div>
        </div>

        <!-- 操作 -->
        <div class="flex justify-center">
          <NuxtLink to="/download" class="btn-primary px-6 py-3">
            返回下载页
          </NuxtLink>
        </div>
      </template>

      <!-- 错误状态 -->
      <template v-else>
        <div
          class="text-center bg-dark-light border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <div
            class="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="lucide:triangle-alert" class="w-8 h-8 text-yellow-500" />
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">未找到下载信息</h1>
          <p class="text-gray-400 mb-8 max-w-md mx-auto">
            没有找到对应版本的下载信息，可能是链接有误或版本已下架。你可以前往
            GitHub Releases 下载，或返回下载页重新选择。
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <NuxtLink to="/download" class="btn-primary px-6 py-3">
              返回下载页
            </NuxtLink>
            <a
              href="https://github.com/hxabcd/EasiAuto/releases"
              target="_blank"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-700 hover:border-primary/40 text-gray-300 hover:text-white transition-colors"
            >
              <Icon name="simple-icons:github" class="w-4 h-4" />
              GitHub Releases
            </a>
          </div>
        </div>
      </template>

      <template #fallback>
        <div class="py-24 text-center text-gray-500">加载中…</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
useHead({ title: '感谢下载' })
useSeoMeta({ robots: 'noindex' })

const route = useRoute()

const { data } = useVersionData()

const version = computed(() => String(route.query.version || '').trim())
const channel = computed(() => String(route.query.channel || 'default').trim())

const entry = computed(() => {
  const downloads = data.value?.versions?.[version.value]?.downloads
  if (!Array.isArray(downloads)) return null
  return downloads.find((item) => item.channel === channel.value) || null
})

const channelLabelText = computed(() =>
  channelLabel(channel.value, version.value)
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

// GitHub Release 链接以附件形式响应，浏览器会直接开始下载而不会离开本页
const startDownload = () => {
  const url = entry.value?.url?.trim()
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

onMounted(() => {
  startDownload()
})

onUnmounted(() => {
  clearTimeout(copiedTimer)
})
</script>
