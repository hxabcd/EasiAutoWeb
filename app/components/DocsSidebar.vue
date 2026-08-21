<template>
  <!-- 移动端折叠版 -->
  <details v-if="collapsible" class="bg-dark-light border border-gray-800 rounded-xl">
    <summary
      class="px-4 py-3 cursor-pointer text-gray-300 hover:text-white transition-colors flex items-center gap-2 select-none"
    >
      <Icon name="lucide:list" class="w-4 h-4" />
      文档导航
    </summary>
    <nav class="px-2 pb-3">
      <template v-for="group in groups" :key="group.name">
        <div class="px-3 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {{ group.name }}
        </div>
        <NuxtLink
          v-for="page in group.pages"
          :key="page.path"
          :to="page.path"
          class="block px-3 py-2 rounded-lg text-sm transition-colors"
          :class="
            isActive(page.path)
              ? 'text-primary bg-primary/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          "
        >
          {{ page.title }}
        </NuxtLink>
      </template>
    </nav>
  </details>

  <!-- 桌面端常驻版 -->
  <nav v-else class="space-y-6">
    <div v-for="group in groups" :key="group.name">
      <div
        class="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
      >
        {{ group.name }}
      </div>
      <div class="space-y-0.5">
        <NuxtLink
          v-for="page in group.pages"
          :key="page.path"
          :to="page.path"
          class="block px-3 py-2 rounded-lg text-sm transition-colors"
          :class="
            isActive(page.path)
              ? 'text-primary bg-primary/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          "
        >
          {{ page.title }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  collapsible: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()

// 只取侧边栏需要的字段，避免把正文塞进 payload
const { data: navItems } = await useAsyncData('docs-nav', async () => {
  const all = await queryCollection('docs').all()
  return all.map((page) => ({
    path: page.path,
    title: page.title,
    nav: page.nav,
    order: page.order ?? 99,
  }))
})

const GROUP_ORDER = ['快速上手', '应用帮助']

const groups = computed(() => {
  const byGroup = new Map()
  for (const page of navItems.value || []) {
    if (!page.nav || !page.path || page.path === '/docs') continue
    if (!byGroup.has(page.nav)) byGroup.set(page.nav, [])
    byGroup.get(page.nav).push(page)
  }
  const names = [...byGroup.keys()].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a)
    const ib = GROUP_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  return names.map((name) => ({
    name,
    pages: byGroup.get(name).sort((a, b) => a.order - b.order),
  }))
})

const isActive = (path) => route.path === path
</script>
