import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-19',
  devtools: { enabled: false },

  modules: ['@nuxt/content', '@nuxt/icon'],

  content: {
    experimental: {
      // 使用 Node 内置 node:sqlite 作为文档索引数据库，免去 better-sqlite3 原生编译
      sqliteConnector: 'native',
    },
  },

  css: ['~/assets/css/main.css'],

  icon: {
    // 图标样式放入 base 层，避免覆盖 Tailwind v4 的 utilities（如 w-4 h-4）
    cssLayer: 'base',
    // 使用本地安装的 @iconify-json/* 数据源，构建不依赖网络
    serverBundle: 'local',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/docs'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'EasiAuto 是一款自动登录希沃白板的小工具，旨在带来更智能、更方便、更易用的希沃白板登录体验，简化课前准备流程。',
        },
        { property: 'og:title', content: 'EasiAuto - 一款自动登录希沃白板的小工具' },
        {
          property: 'og:description',
          content:
            'EasiAuto 是一款自动登录希沃白板的小工具，旨在带来更智能、更方便、更易用的希沃白板登录体验，简化课前准备流程。',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/EasiAuto.webp' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/images/favicon.webp' },
        // HarmonyOS Sans SC 中文分包字体（cn-font-split 预生成）
        { rel: 'stylesheet', href: '/fonts/harmonyos.css' },
      ],
    },
  },
})
