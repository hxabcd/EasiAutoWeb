<template>
  <div v-if="demoMode && !controlsHidden" class="demo-controls">
    <Transition name="demo-controls">
      <div v-show="visible" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3">
        <!-- 隐藏按钮（仅本页会话有效，刷新后恢复显示） -->
        <button
          class="demo-ctrl-btn"
          title="隐藏按钮"
          aria-label="隐藏按钮"
          @click="controlsHidden = true"
        >
          <Icon name="lucide:eye-off" class="w-5 h-5" />
        </button>
        <!-- 暂停/恢复动画 -->
        <button
          class="demo-ctrl-btn"
          :title="animationsPaused ? '恢复动画' : '暂停动画'"
          :aria-label="animationsPaused ? '恢复动画' : '暂停动画'"
          @click="toggleAnimations"
        >
          <Icon :name="animationsPaused ? 'lucide:play' : 'lucide:pause'" class="w-5 h-5" />
        </button>
        <!-- 截图设置 -->
        <button
          class="demo-ctrl-btn"
          title="截图设置"
          aria-label="截图设置"
          @click="showSettings = true"
        >
          <Icon name="lucide:settings" class="w-5 h-5" />
        </button>
        <button
          class="demo-ctrl-btn"
          title="保存截图"
          aria-label="保存截图"
          @click="saveScreenshot"
        >
          <Icon name="lucide:camera" class="w-5 h-5" />
        </button>
        <!-- 全屏切换 -->
        <button
          class="demo-ctrl-btn"
          :title="isFullscreen ? '退出全屏' : '进入全屏'"
          :aria-label="isFullscreen ? '退出全屏' : '进入全屏'"
          @click="toggleFullscreen"
        >
          <Icon :name="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'" class="w-5 h-5" />
        </button>
        <button
          class="demo-ctrl-btn"
          title="退出演示模式"
          aria-label="退出演示模式"
          @click="exitDemoMode"
        >
          <Icon name="lucide:log-out" class="w-5 h-5" />
        </button>
      </div>
    </Transition>

    <!-- 截图设置弹窗 -->
    <div
      v-if="showSettings"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
      @click.self="showSettings = false"
    >
      <div class="w-full max-w-sm rounded-2xl border border-gray-700 bg-dark-light p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-lg font-semibold text-white">截图设置</h3>
          <button class="text-gray-400 hover:text-white transition-colors" aria-label="关闭" @click="showSettings = false">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- 格式 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">格式</label>
            <select v-model="settings.format" class="demo-select">
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>

          <!-- JPEG 画质 -->
          <div v-if="settings.format === 'jpeg'">
            <label class="block text-sm text-gray-400 mb-1">
              画质：{{ Math.round(settings.quality * 100) }}%
            </label>
            <input v-model.number="settings.quality" type="range" min="0.5" max="1" step="0.05" class="w-full accent-emerald-500" />
          </div>

          <!-- 缩放（倍数输入框） -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">缩放（倍数）</label>
            <input
              v-model.number="settings.pixelRatio"
              type="number"
              min="0.1"
              max="4"
              step="0.1"
              class="demo-input"
            />
          </div>

          <!-- 自定义尺寸 -->
          <div>
            <label class="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <input v-model="settings.customSize" type="checkbox" class="accent-emerald-500" />
              自定义尺寸（px）
            </label>
            <div v-if="settings.customSize" class="flex items-center gap-2">
              <input v-model.number="settings.width" type="number" min="1" placeholder="宽" class="demo-input" />
              <span class="text-gray-500">×</span>
              <input v-model.number="settings.height" type="number" min="1" placeholder="高" class="demo-input" />
            </div>
          </div>

          <!-- 背景色 -->
          <div>
            <label class="block text-sm text-gray-400 mb-1">背景色</label>
            <select v-model="settings.backgroundColor" class="demo-select">
              <option value="transparent">透明</option>
              <option value="#0f172a">深色</option>
              <option value="#ffffff">白色</option>
            </select>
          </div>

          <!-- 警告横幅开关 -->
          <div>
            <label class="flex items-center gap-2 text-sm text-gray-400">
              <input v-model="bannerVisible" type="checkbox" class="accent-emerald-500" />
              显示警告横幅（WarningBanner）
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toPng, toJpeg } from "html-to-image"

const { demoMode, exitDemoMode, toggleFullscreen, bannerVisible } = useDemoMode()

// 全屏状态跟随浏览器事件更新
const isFullscreen = ref(false)
const onFsChange = () => {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

// 仅内存状态：刷新页面后即恢复显示，不持久化
const controlsHidden = ref(false)

// 截图参数（仅本次会话有效）
const settings = reactive({
  format: "png",
  quality: 0.95,
  pixelRatio: 2,
  customSize: false,
  width: 1920,
  height: 1080,
  backgroundColor: "transparent",
})

const showSettings = ref(false)

// 暂停/恢复页面动画（CSS 动画；过渡动画无法暂停）
const animationsPaused = ref(false)
let pauseStyle = null
const setAnimationsPaused = (paused) => {
  // 用临时 <style> 注入，作用域覆盖整个文档，且不影响已计算样式的克隆
  if (paused && !pauseStyle) {
    pauseStyle = document.createElement("style")
    pauseStyle.textContent = "*, *::before, *::after { animation-play-state: paused !important; }"
    document.head.appendChild(pauseStyle)
  } else if (!paused && pauseStyle) {
    pauseStyle.remove()
    pauseStyle = null
  }
}
const toggleAnimations = () => {
  animationsPaused.value = !animationsPaused.value
  setAnimationsPaused(animationsPaused.value)
}

// 显示 / 1s 后自动隐藏（设置弹窗打开期间保持可见）
const visible = ref(false)
let hideTimer = null
const show = () => {
  if (!demoMode.value || controlsHidden.value) return
  visible.value = true
  clearTimeout(hideTimer)
  if (showSettings.value) return
  hideTimer = setTimeout(() => {
    visible.value = false
  }, 1000)
}

// 关闭弹窗后重新计时隐藏
watch(showSettings, (val) => {
  if (!val) show()
})

// 截图通过 filter 排除控制按钮/弹窗自身（不改变界面状态）
const saveScreenshot = async () => {
  const opts = {
    pixelRatio: settings.pixelRatio,
    backgroundColor: settings.backgroundColor === "transparent" ? undefined : settings.backgroundColor,
    cacheBust: true,
    ...(settings.customSize
      ? { width: settings.width, height: settings.height }
      : {}),
    filter: (node) => !(node instanceof Element && node.closest(".demo-controls")),
  }
  try {
    const dataUrl =
      settings.format === "jpeg"
        ? await toJpeg(document.body, { ...opts, quality: settings.quality })
        : await toPng(document.body, opts)
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `easiauto-demo-${new Date().toISOString().replace(/[:.]/g, "-")}.${settings.format === "jpeg" ? "jpg" : "png"}`
    a.click()
  } catch (e) {
    console.error("保存截图失败", e)
  }
}

// 弹窗打开时 Esc 仅关闭弹窗，不退出演示模式
const onKeyDown = (e) => {
  if (e.key === "Escape" && showSettings.value) {
    showSettings.value = false
    e.stopPropagation()
  }
}

onMounted(() => {
  show()
  isFullscreen.value = Boolean(document.fullscreenElement)
  document.addEventListener("fullscreenchange", onFsChange)
  document.addEventListener("webkitfullscreenchange", onFsChange)
  window.addEventListener("pointermove", show, { passive: true })
  window.addEventListener("touchstart", show, { passive: true })
  window.addEventListener("click", show)
  document.addEventListener("keydown", onKeyDown, true)
})

onUnmounted(() => {
  clearTimeout(hideTimer)
  setAnimationsPaused(false)
  document.removeEventListener("fullscreenchange", onFsChange)
  document.removeEventListener("webkitfullscreenchange", onFsChange)
  window.removeEventListener("pointermove", show)
  window.removeEventListener("touchstart", show)
  window.removeEventListener("click", show)
  document.removeEventListener("keydown", onKeyDown, true)
})
</script>

<style scoped>
.demo-ctrl-btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  backdrop-filter: blur(6px);
  transition: background 0.2s, transform 0.2s, color 0.2s;
  cursor: pointer;
}

.demo-ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #10b981;
  transform: scale(1.05);
}

.demo-controls-enter-active,
.demo-controls-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.demo-controls-enter-from,
.demo-controls-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.demo-select,
.demo-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #1f2937;
  color: #e5e7eb;
  font-size: 0.875rem;
}
</style>
