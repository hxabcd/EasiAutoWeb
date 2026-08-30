// 滚动触发动画：替代原 main.js 中的 IntersectionObserver 逻辑，
// 并在客户端路由切换后重新观察新增的 .animate-on-scroll 元素
export default defineNuxtPlugin((nuxtApp) => {
  let observer = null

  const setup = () => {
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            element.style.opacity = '1'
            element.style.transform = 'translateY(0)'
            // 动画完成后添加 animated 类，启用 hover 效果
            setTimeout(() => {
              element.classList.add('animated')
              // 清除内联样式，让 CSS 状态接管，避免覆盖 hover 效果
              element.style.opacity = ''
              element.style.transform = ''
            }, 600)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      if (!element.classList.contains('animated')) {
        observer.observe(element)
      }
    })
  }

  window.addEventListener('load', setup)
  nuxtApp.hook('page:finish', () => {
    nextTick(setup)
  })
})
