import { ref } from "vue"

// 模块级共享状态：Header、Banner 等组件共用
// 演示模式与浏览器全屏相互独立：退出全屏不会退出演示模式
const demoMode = ref(false)

// 演示模式下是否显示警告横幅（设置弹窗可切换）
const bannerVisible = ref(true)

// Esc 仅退出全屏（若处于全屏），不退出演示模式
const onKeyDown = (e) => {
  if (e.key === "Escape" && document.fullscreenElement) {
    try {
      document.exitFullscreen()
    } catch {
      // 全屏已退出时忽略
    }
  }
}

export function useDemoMode() {
  const router = useRouter()

  /**
   * 进入演示模式：跳转到仅含 Banner 的 /demo 页（默认不全屏）
   */
  const enterDemoMode = async () => {
    demoMode.value = true
    // 每次进入演示模式重新显示警告横幅，设置项仅对本次演示有效
    bannerVisible.value = true
    await router.push("/demo")
  }

  const exitDemoMode = async () => {
    demoMode.value = false
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch {
      // 全屏已退出时忽略
    }
  }

  /** 切换浏览器全屏（独立于演示模式状态） */
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch {
      // 浏览器不支持全屏时忽略
    }
  }

  // 仅挂载一次监听（组件卸载时按引用解绑，不会泄漏）
  if (import.meta.client && !window.__demoModeBound) {
    window.__demoModeBound = true
    document.addEventListener("keydown", onKeyDown)
  }

  return { demoMode, bannerVisible, enterDemoMode, exitDemoMode, toggleFullscreen }
}
