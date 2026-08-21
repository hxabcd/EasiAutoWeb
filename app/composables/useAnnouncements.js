// 公告数据。public/announcements.json 由桌面端直接请求；
// 网站在构建期静态导入同一份文件（SSG 场景下数据本来就随构建固化）。
// 每条公告可用可选字段 targets 声明展示端："desktop" / "web"；
// 未声明时视为仅桌面端（与历史数据语义一致，网页端不展示）。
import announcementsData from '../public/announcements.json'

export function useAnnouncements() {
  // 网页端可见、处于展示时间窗内、按发布时间倒序的公告
  const webAnnouncements = computed(() => {
    const now = new Date()
    return (announcementsData.announcements || [])
      .filter((item) => Array.isArray(item.targets) && item.targets.includes('web'))
      .filter((item) => {
        if (item.start_at && new Date(item.start_at) > now) return false
        if (item.end_at && new Date(item.end_at) < now) return false
        return true
      })
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  })

  return { webAnnouncements }
}
