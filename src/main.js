import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");

// 滚动触发动画
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          // 触发动画
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";

          // 动画完成后添加animated类，启用hover效果
          setTimeout(() => {
            element.classList.add("animated");
          }, 600); // 等待动画完成

          // 停止观察
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// 页面加载完成后初始化
window.addEventListener("load", handleScrollAnimations);

// 如果需要支持动态添加的元素，可以在组件挂载后调用
app.config.globalProperties.$initScrollAnimations = handleScrollAnimations;
