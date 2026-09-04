<template>
  <div class="warning-banner" :style="bannerStyle">
    <!-- 顶部条纹 -->
    <div class="stripe-container">
      <div class="stripes-bg"></div>
    </div>

    <!-- 中间内容区 -->
    <div class="content-area">
      <div class="divider-line"></div>

      <!-- 文本滚动：纯 CSS 动画在合成器线程运行，不占用主线程 -->
      <div ref="containerRef" class="text-container">
        <div class="text-track" :style="trackStyle">
          <div class="text-group">
            <span v-for="i in copyCount" :key="i" ref="textRef" class="warning-text">
              {{ config.text }}
            </span>
          </div>
          <!-- 第二组相同内容，配合 -50% 位移实现无缝循环 -->
          <div class="text-group" aria-hidden="true">
            <span v-for="i in copyCount" :key="i" class="warning-text">
              {{ config.text }}
            </span>
          </div>
        </div>
      </div>

      <div class="divider-line"></div>
    </div>

    <!-- 底部条纹 -->
    <div class="stripe-container">
      <div class="stripes-bg"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 可选高度（px）：由父组件按主卡片高度的 25% 计算传入，最大值 100px
  height: {
    type: Number,
    default: null,
  },
})

// 设计高度 110px；实际高度低于设计高度时按比例（0~1）等比缩放内部各元素，
// 避免小高度下条纹/文字被 overflow:hidden 裁切
const scale = computed(() => Math.min(props.height ?? 110, 100) / 110)
const bannerStyle = computed(() => ({
  "--banner-scale": scale.value,
  ...(props.height ? { height: `${Math.min(props.height, 100)}px` } : {}),
}))

// 配置 - 使用像素/秒作为速度单位，确保不同帧率下速度一致
const config = {
  text: '⚠️WARNING⚠️   正在运行希沃白板自动登录 请勿触摸一体机   ',
  textSpeed: 80, // 文本滚动速度：像素/秒
  stripeSpeed: 30, // 条纹滚动速度：像素/秒
  stripeWidth: 28, // 条纹图案周期宽度
}

// 每组文本份数与动画时长只在挂载、字体就绪、窗口变化时计算一次；
// 滚动本身完全交给 CSS 动画，不再逐帧修改响应式状态
const copyCount = ref(4)
const duration = ref(30)
const containerRef = ref(null)
const textRef = ref(null)

const trackStyle = computed(() => ({
  animationDuration: `${duration.value}s`,
}))

// 测量一份文本宽度，据此确定铺满容器需要的份数和恒定速度对应的时长
const measure = () => {
  const container = containerRef.value
  const text = textRef.value?.[0]
  if (!container || !text) return
  const textWidth = text.offsetWidth
  if (!textWidth) return // 隐藏（display:none）时测不到宽度，保持默认值
  copyCount.value = Math.max(2, Math.ceil(container.clientWidth / textWidth) + 1)
  duration.value = (copyCount.value * textWidth) / config.textSpeed
}

onMounted(() => {
  nextTick(measure)
  // 中文字体分包加载完成后文本宽度会变化，需要重新测量
  document.fonts?.ready.then(measure)
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  window.removeEventListener('resize', measure)
})
</script>

<style scoped>
.warning-banner {
  position: relative;
  width: 100%;
  height: 110px;
  max-height: 100px;
  overflow: hidden;
  background-color: #e21114d5;
  display: flex;
  flex-direction: column;
  /* 等比缩放因子：高度低于 110px 设计高度时由脚本按内联值覆盖 */
  --banner-scale: 1;
  /* 禁止选中文本 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 条纹容器 */
.stripe-container {
  position: relative;
  width: 100%;
  height: calc(18px * var(--banner-scale));
  overflow: hidden;
  flex-shrink: 0;
}

/* 条纹背景 - 平行四边形斜度适中：顶点改为 0,32 12,0 24,0 12,32 */
.stripes-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  /* 多留一个条纹周期，左移一个周期后仍能盖满容器 */
  width: calc(100% + 28px * var(--banner-scale));
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cpolygon points='0,32 12,0 24,0 12,32' fill='%23ffde59' fill-opacity='0.7'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: calc(28px * var(--banner-scale)) calc(32px * var(--banner-scale));
  will-change: transform;
  /* 28px / 30px每秒 ≈ 0.9333s，位移一个周期即可无缝循环 */
  animation: stripe-scroll 0.9333s linear infinite;
}

@keyframes stripe-scroll {
  to {
    transform: translateX(calc(-28px * var(--banner-scale)));
  }
}

/* 中间内容区 */
.content-area {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 分隔线 */
.divider-line {
  width: 100%;
  height: calc(2px * var(--banner-scale));
  background-color: rgba(255, 222, 89, 0.6);
  flex-shrink: 0;
}

/* 文本滚动 */
.text-container {
  position: relative;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
}

/* 两组相同内容等宽排列，位移 -50%（恰好一组宽度）即无缝循环 */
.text-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: text-scroll linear infinite;
}

.text-group {
  display: flex;
  flex-shrink: 0;
}

@keyframes text-scroll {
  to {
    transform: translateX(-50%);
  }
}

.warning-text {
  font-size: calc(2.5rem * var(--banner-scale));
  font-weight: 700;
  color: #ffde59;
  text-transform: uppercase;
  flex-shrink: 0;
}
</style>
