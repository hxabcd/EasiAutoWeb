// 版本清单数据。public/update.json 由桌面端直接请求；
// 网站在构建期静态导入同一份文件（SSG 场景下数据本来就随构建固化），
// 避免 prerender 阶段对静态资源的运行时请求。
import manifest from '../public/update.json'

export function useVersionData() {
  const data = computed(() => manifest)

  const latestVersion = computed(() => manifest.latest || '')
  const latestDevVersion = computed(() => manifest.latest_dev || '')

  // 按版本号降序（最新在前）的版本列表 [key, info]
  const sortedVersions = computed(() => {
    const versions = manifest.versions || {}
    return Object.entries(versions).sort((a, b) => compareVersions(b[0], a[0]))
  })

  return { data, latestVersion, latestDevVersion, sortedVersions }
}
