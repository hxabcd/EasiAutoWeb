<template>
  <div class="warning-banner">
    <!-- 顶部条纹 -->
    <div class="stripe-container">
      <div class="stripes-wrapper" :style="stripeWrapperStyle">
        <div class="stripes-bg" :style="stripesBgStyle"></div>
        <div class="stripes-bg" :style="stripesBgStyle"></div>
      </div>
    </div>

    <!-- 中间内容区 -->
    <div class="content-area">
      <div class="divider-line"></div>

      <!-- 文本滚动 -->
      <div class="text-container">
        <div class="text-scroll" :style="textScrollStyle">
          <span
            v-for="(text, index) in visibleTexts"
            :key="index"
            class="warning-text"
            ref="textRef"
          >
            {{ text }}
          </span>
        </div>
      </div>

      <div class="divider-line"></div>
    </div>

    <!-- 底部条纹 -->
    <div class="stripe-container">
      <div class="stripes-wrapper" :style="stripeWrapperStyle">
        <div class="stripes-bg" :style="stripesBgStyle"></div>
        <div class="stripes-bg" :style="stripesBgStyle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 配置 - 使用像素/秒作为速度单位，确保不同帧率下速度一致
const config = {
  text: '⚠️WARNING⚠️   正在运行希沃白板自动登录 请勿触摸一体机   ',
  textSpeed: 80, // 文本滚动速度：像素/秒
  stripeSpeed: 30, // 条纹滚动速度：像素/秒
  stripeWidth: 28, // 条纹图案周期宽度
}

// 状态
const textX = ref(0)
const stripeOffset = ref(0)
const textWidth = ref(0)
const textRef = ref(null)
const containerWidth = ref(0)
let animationId = null
let lastTime = null

// 计算需要显示的文本份数
const visibleTexts = computed(() => {
  const count = Math.ceil(containerWidth.value / (textWidth.value || 1)) + 2
  return Array(count).fill(config.text)
})

// 条纹容器样式
const stripeWrapperStyle = computed(() => {
  return {
    transform: `translateX(${-stripeOffset.value}px)`,
  }
})

// 条纹背景样式 - 使用 CSS 背景图片，性能更好
// 平行四边形斜度适中：顶点改为 0,32 12,0 24,0 12,32
const stripesBgStyle = computed(() => {
  return {
    width: `${containerWidth.value + config.stripeWidth}px`,
    height: '100%',
    flexShrink: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cpolygon points='0,32 12,0 24,0 12,32' fill='%23ffde59' fill-opacity='0.7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '28px 32px',
  }
})

// 文本滚动样式
const textScrollStyle = computed(() => {
  return {
    transform: `translateX(${textX.value}px)`,
  }
})

// 动画循环 - 基于时间计算，确保不同帧率下速度一致
const animate = (currentTime) => {
  if (lastTime === null) {
    lastTime = currentTime
  }

  // 计算时间差（秒）
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  // 条纹滚动 - 基于时间计算
  stripeOffset.value = (stripeOffset.value + config.stripeSpeed * deltaTime) % config.stripeWidth

  // 文字滚动 - 基于时间计算
  textX.value -= config.textSpeed * deltaTime

  // 当第一个文本完全移出左侧时，重置位置实现无缝循环
  if (textX.value < -textWidth.value) {
    textX.value += textWidth.value
  }

  animationId = requestAnimationFrame(animate)
}

// 测量文本宽度
const measureTextWidth = () => {
  if (textRef.value && textRef.value[0]) {
    textWidth.value = textRef.value[0].offsetWidth
  }
  containerWidth.value = window.innerWidth
}

onMounted(() => {
  measureTextWidth()
  window.addEventListener('resize', measureTextWidth)
  // 等待 DOM 更新后再开始动画
  setTimeout(() => {
    measureTextWidth()
    animationId = requestAnimationFrame(animate)
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', measureTextWidth)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.warning-banner {
  position: relative;
  width: 100%;
  height: 110px;
  overflow: hidden;
  background-color: #e21114d5;
  display: flex;
  flex-direction: column;
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
  height: 18px;
  overflow: hidden;
  flex-shrink: 0;
}

.stripes-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  will-change: transform;
  display: flex;
}

.stripes-bg {
  will-change: transform;
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
  height: 2px;
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

.text-scroll {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}

.warning-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffde59;
  text-transform: uppercase;
  flex-shrink: 0;
}
</style>
