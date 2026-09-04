<template>
  <div class="min-h-screen gradient-bg">
    <Banner />
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { demoMode } = useDemoMode()
demoMode.value = true

// 退出演示（Esc / 控制按钮）后自动返回首页；离开演示页时恢复全局状态
const router = useRouter()
watch(demoMode, (val) => {
  if (!val && router.currentRoute.value.path === "/demo") {
    router.push("/")
  }
})

onUnmounted(() => {
  demoMode.value = false
})
</script>
