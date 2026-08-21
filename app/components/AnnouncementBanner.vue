<template>
  <div
    v-if="item && !dismissed"
    class="w-fit max-w-full mx-auto rounded-full border shadow-lg bg-dark/70 backdrop-blur-md flex items-center gap-2 text-sm px-4 py-1.5"
    :class="config.border"
  >
    <Icon :name="config.icon" class="w-4 h-4 shrink-0" :class="config.text" />
    <span class="font-semibold shrink-0" :class="config.text">{{
      item.title
    }}</span>
    <span class="text-gray-200 truncate hidden sm:inline">{{
      item.content
    }}</span>
    <a
      v-if="item.link"
      :href="item.link"
      target="_blank"
      rel="noopener"
      class="text-primary hover:text-primary-light transition-colors shrink-0 inline-flex items-center gap-1"
    >
      <span class="hidden sm:inline">查看</span>
      <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
    </a>
    <button
      class="text-gray-500 hover:text-white transition-colors shrink-0"
      aria-label="关闭公告"
      @click="dismissed = true"
    >
      <Icon name="lucide:x" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
})

const dismissed = ref(false)
const config = computed(() => severityConfig(props.item?.severity))
</script>
