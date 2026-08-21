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
