# EasiAuto 宣传网站

这是 EasiAuto 项目的官方宣传网站，使用 Vue 3 + Vite + Tailwind CSS 构建。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看网站

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 部署

### GitHub Pages

1. 构建项目：`npm run build`
2. 将 `dist` 目录的内容推送到 `gh-pages` 分支
3. 在仓库设置中启用 GitHub Pages

### Vercel

1. 将仓库导入 Vercel
2. 配置构建命令为 `npm run build`
3. 配置输出目录为 `dist`
4. 部署

### Netlify

1. 将仓库导入 Netlify
2. 配置构建命令为 `npm run build`
3. 配置发布目录为 `dist`
4. 部署

## 项目结构

```
website/
├── public/
│   └── images/          # 图片资源
├── src/
│   ├── components/      # Vue 组件
│   │   ├── Header.vue
│   │   ├── Hero.vue
│   │   ├── Features.vue
│   │   ├── TechStack.vue
│   │   ├── Screenshots.vue
│   │   ├── Cta.vue
│   │   └── Footer.vue
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## License

GPL v3
