/**
 * 从 harmonyos-sans-sc-webfont-splitted 包提取所需字重的分包字体,
 * 在 nuxi generate 之后注入到 .output/public/fonts/(harmonyos.css + 平铺 woff2 分片)。
 * 仓库和 public/ 中不保留任何字体文件,必须在 build 中于 nuxi generate 之后执行。
 */
import { createRequire } from 'node:module'
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PKG = 'harmonyos-sans-sc-webfont-splitted'
// 400/500/600/700,覆盖 Tailwind 的 font-normal / font-medium / font-semibold / font-bold
const WEIGHTS = ['Regular', 'Medium', 'Semibold', 'Bold']

const require = createRequire(import.meta.url)
const distDir = dirname(require.resolve(PKG))
const outDir = fileURLToPath(new URL('../.output/public/fonts', import.meta.url))

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

let css = ''
let chunks = 0
for (const weight of WEIGHTS) {
  css += `${readFileSync(join(distDir, `${weight}.css`), 'utf8')}\n`
  for (const file of readdirSync(distDir)) {
    if (file.startsWith(`${weight}_`) && file.endsWith('.woff2')) {
      copyFileSync(join(distDir, file), join(outDir, file))
      chunks++
    }
  }
}
writeFileSync(join(outDir, 'harmonyos.css'), css)

console.log(`fonts: ${WEIGHTS.length} weights, ${chunks} woff2 chunks -> .output/public/fonts/`)

// 清理 Nitro 在 Cloudflare 环境下生成的部署重定向（cloudflare-module 预设产物）。
// 本站是纯静态 SSG（nuxi generate），没有 worker 入口（index.mjs），
// 重定向会让 `wrangler deploy` 找不到入口而失败；
// 清掉后 wrangler 回落到仓库根目录的 wrangler.jsonc（静态资产模式，指向 .output/public）。
const repoRoot = fileURLToPath(new URL('..', import.meta.url))
for (const dir of ['.wrangler', '.output/server']) {
  rmSync(join(repoRoot, dir), { recursive: true, force: true })
  console.log(`cleanup: removed ${dir}`)
}
