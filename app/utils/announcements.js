// 公告 severity → 样式与图标配置
export const SEVERITY_CONFIG = {
  info: {
    label: '通知',
    icon: 'lucide:info',
    border: 'border-primary/40',
    bg: 'bg-primary/10',
    text: 'text-primary',
  },
  warning: {
    label: '注意',
    icon: 'lucide:triangle-alert',
    border: 'border-yellow-500/40',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-500',
  },
  error: {
    label: '重要',
    icon: 'lucide:octagon-alert',
    border: 'border-red-500/40',
    bg: 'bg-red-500/10',
    text: 'text-red-500',
  },
}

export function severityConfig(severity) {
  return SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.info
}

export function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
