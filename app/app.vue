<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <DemoControls />
</template>

<script setup>
useHead({
  titleTemplate: (title) =>
    title ? `${title} · EasiAuto` : 'EasiAuto - 一款自动登录希沃白板的小工具',
})
</script>
