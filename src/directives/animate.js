export default {
  beforeMount(el, binding) {
    // 元素渲染前就设置为透明，避免闪烁
    el.classList.add('opacity-0')
  },
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0')
          el.classList.add('fade-in-up')
          observer.unobserve(el)
        }
      })
    }, options)

    observer.observe(el)
  }
}
