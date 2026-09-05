// 版本号比较：严格遵循 PEP 440（https://peps.python.org/pep-0440/）。
// 格式：[N!]N(.N)*[{a|b|rc}N][.postN][.devN][+local]
// 排序键依次为：epoch → release（末尾的 0 不参与比较）→ pre（a < b < rc）
// → post → dev → local（数字段大于字母段）。
// 大小写与 v 前缀不敏感，- _ . 分隔符均可接受；别写法按规范归一化：
// alpha→a、beta→b、c/pre/preview→rc、r/rev/-N→post。
// 注意 r 在 PEP 440 中是 post 的别写法：1.1.4r1 即 1.1.4.post1，排在 1.1.4 之后。
// 无法解析的输入不参与 PEP 排序，退化为字符串比较。
const VERSION_PATTERN = new RegExp(
  '^v?' +
    '(?:(?<epoch>\\d+)!)?' +
    '(?<release>\\d+(?:\\.\\d+)*)' +
    '(?:[-_.]?(?<preL>alpha|a|beta|b|preview|pre|c|rc)[-_.]?(?<preN>\\d+)?)?' +
    '(?:-(?<postN1>\\d+)|[-_.]?(?<postL>post|rev|r)[-_.]?(?<postN2>\\d+)?)?' +
    '(?:[-_.]?(?<devL>dev)[-_.]?(?<devN>\\d+)?)?' +
    '(?:\\+(?<local>[a-z0-9]+(?:[-_.][a-z0-9]+)*))?' +
    '$',
  'i'
)

const PRE_LABELS = { alpha: 'a', a: 'a', beta: 'b', b: 'b', c: 'rc', pre: 'rc', preview: 'rc', rc: 'rc' }

export function parseVersion(version) {
  const groups = VERSION_PATTERN.exec(String(version ?? '').trim())?.groups
  if (!groups) return null

  return {
    epoch: groups.epoch ? Number(groups.epoch) : 0,
    release: groups.release.split('.').map(Number),
    pre: groups.preL
      ? { label: PRE_LABELS[groups.preL.toLowerCase()], number: groups.preN ? Number(groups.preN) : 0 }
      : null,
    post: groups.postN1
      ? Number(groups.postN1)
      : groups.postL
        ? Number(groups.postN2 ?? 0)
        : null,
    dev: groups.devL ? Number(groups.devN ?? 0) : null,
    local: groups.local
      ? groups.local
          .toLowerCase()
          .split(/[-_.]/)
          .map((part) => (/^\d+$/.test(part) ? Number(part) : part))
      : [],
  }
}

// 无 pre 时的分段：纯 dev 版排在所有 pre 之前，正式版（含 post）排在所有 pre 之后
function preRank(v) {
  if (v.pre) return 1
  return v.post === null && v.dev !== null ? -1 : 2
}

// local 段比较：数字段 > 字母段，短的更小，无 local 最小
function compareLocal(a, b) {
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    const sa = a[i]
    const sb = b[i]
    if (sa === undefined) return -1
    if (sb === undefined) return 1
    const na = typeof sa === 'number'
    const nb = typeof sb === 'number'
    if (na && nb) {
      if (sa !== sb) return sa - sb
    } else if (na !== nb) {
      return na ? 1 : -1
    } else if (sa !== sb) {
      return sa < sb ? -1 : 1
    }
  }
  return 0
}

// 升序比较；无法解析时退化为字符串比较
export function compareVersions(a, b) {
  const va = parseVersion(a)
  const vb = parseVersion(b)
  if (!va || !vb) return String(a).localeCompare(String(b))

  if (va.epoch !== vb.epoch) return va.epoch - vb.epoch

  // 逐段数值比较，缺省段按 0 处理（等价于忽略末尾的 0，1.0 与 1.0.0 相等）
  const releaseLen = Math.max(va.release.length, vb.release.length)
  for (let i = 0; i < releaseLen; i++) {
    const diff = (va.release[i] || 0) - (vb.release[i] || 0)
    if (diff) return diff
  }

  const rankDiff = preRank(va) - preRank(vb)
  if (rankDiff) return rankDiff
  if (va.pre && vb.pre) {
    if (va.pre.label !== vb.pre.label) return va.pre.label < vb.pre.label ? -1 : 1
    if (va.pre.number !== vb.pre.number) return va.pre.number - vb.pre.number
  }

  const postA = va.post ?? -1 // 无 post 排在任何 post 之前
  const postB = vb.post ?? -1
  if (postA !== postB) return postA - postB

  const devA = va.dev ?? Infinity // 无 dev 排在有 dev 的版本之后
  const devB = vb.dev ?? Infinity
  if (devA !== devB) return devA < devB ? -1 : 1

  return compareLocal(va.local, vb.local)
}

// 下载渠道标识 → 展示名
export const CHANNEL_LABELS = {
  default: '完整版',
  lite: '精简版',
  no_cv: '精简版（无 CV）',
}

// 1.3.0 起停止发布精简版分支，统一为单一版本（含适配）。
// 按 release 段判断归属（1.3.0b1、1.3.0、1.4.0 等均视为统一版本）。
export const UNIFIED_VERSION = [1, 3, 0]

export function isUnifiedVersion(version) {
  const parsed = parseVersion(version)
  if (!parsed) return false
  const len = Math.max(parsed.release.length, UNIFIED_VERSION.length)
  for (let i = 0; i < len; i++) {
    const a = parsed.release[i] || 0
    const b = UNIFIED_VERSION[i] || 0
    if (a !== b) return a > b
  }
  return true
}

// 渠道展示名：统一版本（≥1.3.0）不再区分分支，默认渠道直接显示「下载」
export function channelLabel(channel, version) {
  if (channel === 'default' && isUnifiedVersion(version)) return '下载'
  return CHANNEL_LABELS[channel] || channel
}
