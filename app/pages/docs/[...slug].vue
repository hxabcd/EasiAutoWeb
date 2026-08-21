<template>
  <div v-if="page">
    <article class="prose prose-invert max-w-none
      prose-headings:text-white prose-p:text-gray-300 prose-strong:text-title-green
      prose-a:text-primary prose-code:text-title-green prose-code:before:content-none prose-code:after:content-none
      prose-li:text-gray-300 prose-blockquote:border-primary/40 prose-blockquote:text-gray-400
      prose-hr:border-gray-800 prose-th:text-gray-200 prose-td:text-gray-300
    ">
      <ContentRenderer :value="page" />
    </article>

    <!-- 上一页 / 下一页 -->
    <div
      v-if="prev || next"
      class="mt-12 pt-6 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="group bg-dark-light rounded-xl border border-gray-800 p-4 hover:border-primary/40 transition-colors"
      >
        <span class="text-xs text-gray-500 flex items-center gap-1 mb-1">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" /> 上一页
        </span>
        <span class="text-sm text-gray-300 group-hover:text-primary transition-colors">
          {{ prev.title }}
        </span>
      </NuxtLink>
      <span v-else class="hidden sm:block"></span>
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group bg-dark-light rounded-xl border border-gray-800 p-4 hover:border-primary/40 transition-colors text-right"
      >
        <span class="text-xs text-gray-500 flex items-center gap-1 justify-end mb-1">
          下一页 <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </span>
        <span class="text-sm text-gray-300 group-hover:text-primary transition-colors">
          {{ next.title }}
        </span>
      </NuxtLink>
    </div>

    <!-- 在 GitHub 上编辑此页 -->
    <div class="mt-8 text-sm">
      <a
        :href="editUrl"
        target="_blank"
        rel="noopener"
        class="text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1.5"
      >
        <Icon name="lucide:pen-line" class="w-4 h-4" />
        在 GitHub 上编辑此页
      </a>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'docs' })

const route = useRoute()
const path = computed(() => {
  const clean = route.path.replace(/\/+$/, '')
  return clean || '/docs'
})

const { data: page } = await useAsyncData(`docs-page-${path.value}`, () =>
  queryCollection('docs').path(path.value).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '文档不存在' })
}

const { data: surround } = await useAsyncData(
  `docs-surround-${path.value}`,
  () =>
    queryCollectionItemSurroundings('docs', path.value, {
      fields: ['title', 'description'],
    }).order('path', 'ASC')
)

const prev = computed(() => surround.value?.[0] || null)
const next = computed(() => surround.value?.[1] || null)

const editUrl = computed(() => {
  const stem = page.value?.stem || ''
  return `https://github.com/hxabcd/EasiAutoWeb/edit/main/content/${stem}.md`
})

useHead({ title: page.value?.title || '文档' })
useSeoMeta({
  description: page.value?.description || '',
})
</script>
