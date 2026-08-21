# EasiAuto 官网

EasiAuto 项目的官方网站，使用 Nuxt 4 + Tailwind CSS 4 构建，静态生成（SSG）后部署到 Cloudflare Workers。

## 功能

- **首页**：产品介绍、核心功能、界面展示、下载入口
- **下载体系**：`/download` 下载主页（系统要求、四渠道下载）、`/download/versions` 版本历史与更新日志、`/download/mirrors` 镜像页
- **文档站**：`/docs`，基于 [@nuxt/content](https://content.nuxt.com)，侧边栏分类导航、上一页/下一页、在 GitHub 编辑此页
- **公告横幅**：首页顶部横幅（数据同 `announcements.json`，支持按端别控制展示）

## 技术栈

- [Nuxt 4](https://nuxt.com)（SSG 静态生成）+ [@nuxt/content](https://content.nuxt.com) 文档系统
- [Tailwind CSS 4](https://tailwindcss.com)（`@tailwindcss/vite` 插件，色板在 `app/assets/css/main.css` 的 `@theme` 中定义）
- [@nuxt/icon](https://github.com/nuxt/icon)（Iconify：`lucide:*` / `simple-icons:*`，本地数据源，构建期内联）
- HarmonyOS Sans SC 中文分包字体（npm 包 `harmonyos-sans-sc-webfont-splitted`，构建后由 `scripts/copy-fonts.mjs` 注入 `.output/public/fonts/`，仓库不保留字体文件）

## 数据文件（桌面端共用）

- `public/update.json` —— 版本清单（latest / latest_dev / 各版本更新日志与下载渠道）。修改后推送会触发 `.github/workflows/transfer_manifest.yaml` 同步到镜像仓库。
- `public/announcements.json` —— 公告数据。每条公告支持可选字段 `targets`（`"desktop"` / `"web"` 数组）；**未声明时视为仅桌面端**，网页端只展示 `targets` 包含 `web` 的条目。

网站在构建期直接导入这两份 JSON（SSG 数据随构建固化），同时原样发布供 EasiAuto 桌面端请求。

## 开发

```bash
pnpm install
pnpm dev        # 开发服务器
```

## 构建与部署

```bash
pnpm build      # nuxi generate，静态产物输出到 .output/public
pnpm preview    # wrangler dev 本地预览（与线上一致）
pnpm deploy     # 构建 + wrangler deploy 到 Cloudflare Workers
```

Cloudflare 配置见 `wrangler.jsonc`（静态资源模式，`not_found_handling: 404-page`）。

> CI 构建需要 Node 24+（文档索引使用 Node 内置 `node:sqlite`），仓库已包含 `.node-version`。

## 字体

字体来自 npm 包 `harmonyos-sans-sc-webfont-splitted`（Regular / Medium / Semibold / Bold 四个字重），`pnpm build` 在 `nuxi generate` 之后自动执行 `scripts/copy-fonts.mjs`，把分包 woff2 与 `harmonyos.css` 注入 `.output/public/fonts/`。仓库与 `public/` 不保存任何字体文件。

## 项目结构

```
├── app/
│   ├── assets/css/main.css   # Tailwind 4 色板与全局样式
│   ├── components/           # 组件（Header/Banner/Features/DownloadButton 等）
│   ├── composables/          # useVersionData / useAnnouncements
│   ├── layouts/              # default / docs 布局
│   ├── pages/                # 首页、download/*、announcements、docs/*
│   ├── plugins/              # 滚动动画（客户端）
│   └── utils/                # 版本比较器、公告样式配置
├── content/docs/             # 文档 Markdown 源
├── public/                   # 图片、字体分包、update.json、announcements.json
├── content.config.ts         # @nuxt/content 集合定义
├── nuxt.config.ts
└── wrangler.jsonc            # Cloudflare Workers 配置
```

## License

GPL v3
