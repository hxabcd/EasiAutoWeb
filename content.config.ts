import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        // 侧边栏分组名（如「快速上手」「应用帮助」）
        nav: z.string().optional(),
        // 组内排序
        order: z.number().optional(),
      }),
    }),
  },
})
