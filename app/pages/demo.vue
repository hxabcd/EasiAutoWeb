<template>
  <div class="min-h-screen gradient-bg">
    <Banner />
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { demoMode } = useDemoMode()
demoMode.value = true

// 退出导航由 useDemoMode.exitDemoMode 处理；这里仅确保离开演示页时恢复全局状态
// （如浏览器后退键直接离开 /demo 时，演示控件不会残留在其他页面）
onUnmounted(() => {
  demoMode.value = false
})
</script>
