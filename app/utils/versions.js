// 版本号比较：支持 1.2.2b2 / 1.1.0a1 / 1.1.4r1 / 1.2.0 这类格式。
// 后缀等级：无后缀(正式) > r(修订) > b(测试) > a(预览)。
const SUFFIX_RANK = { a: 0, b: 1, r: 2 }

export function parseVersion(version) {
  const match = /^(?:v)?(\d+)\.(\d+)\.(\d+)(?:([abr])(\d+))?$/.exec(version || '')
  if (!match) return null
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    suffix: match[4] || null,
    suffixNum: match[5] ? Number(match[5]) : 0,
  }
}

// 升序比较；无法解析时退化为字符串比较
export function compareVersions(a, b) {
  const va = parseVersion(a)
  const vb = parseVersion(b)
  if (!va || !vb) return String(a).localeCompare(String(b))

  const base =
    va.major - vb.major || va.minor - vb.minor || va.patch - vb.patch
  if (base !== 0) return base

  const rankA = va.suffix ? SUFFIX_RANK[va.suffix] : 3
  const rankB = vb.suffix ? SUFFIX_RANK[vb.suffix] : 3
  return rankA - rankB || va.suffixNum - vb.suffixNum
}

// 下载渠道标识 → 展示名
export const CHANNEL_LABELS = {
  default: '完整版',
  lite: '精简版',
  no_cv: '精简版（无 CV）',
}
