<template>
  <div class="min-h-screen gradient-bg flex flex-col">
    <div class="flex-1 flex items-center justify-center px-4 pt-16">
      <div class="text-center max-w-md">
        <h1 class="text-6xl font-bold text-title-green mb-4">{{ error.statusCode }}</h1>
        <p class="text-xl text-gray-300 mb-2">
          {{ error.statusCode === 404 ? '页面不存在' : '出错了' }}
        </p>
        <p class="text-gray-400 mb-8">
          {{ error.statusMessage || '请检查链接是否正确，或返回首页继续浏览。' }}
        </p>
        <button class="btn-primary" @click="handleError">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const handleError = () => clearError({ redirect: '/' })
</script>
