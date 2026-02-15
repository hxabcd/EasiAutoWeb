<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 lg:pt-10"
  >
    <!-- 警告横幅 - 仅桌面端显示 -->
    <div
      v-if="showBanner"
      class="absolute top-20 left-0 right-0 z-40 hidden lg:block"
    >
      <WarningBanner />
      <button
        @click="closeBanner"
        class="absolute -bottom-6 right-2 w-4 h-4 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full transition-colors z-50 shadow-lg"
      >
        <svg
          class="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <div
      class="absolute inset-0 bg-gradient-to-tl from-gradientTop to-gradientBottom"
    ></div>

    <!-- 右侧窗口展示 -->
    <div
      class="absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none hidden lg:block select-none"
    >
      <!-- 主窗口 - 设置页面 -->
      <div
        class="absolute right-[-260px] top-[60%] -translate-y-1/2 w-[680px] transform perspective-1000 bg-element z-20 window-3d"
        style="animation-delay: 0.3s"
      >
        <img
          src="/images/setting.webp"
          alt="设置页面"
          class="w-full h-auto rounded-xl shadow-2xl float-animation"
          style="--float-delay: 0s"
          draggable="false"
        />
      </div>

      <!-- 左上窗口 - 运行前警告 -->
      <div
        class="absolute right-[520px] top-[12%] w-[360px] transform perspective-1000 bg-element z-15 window-3d"
        style="animation-delay: 0.5s"
      >
        <img
          src="/images/warning.webp"
          alt="运行前警告"
          class="w-full h-auto rounded-xl shadow-xl float-animation"
          style="--float-delay: 0.3s"
          draggable="false"
        />
      </div>

      <!-- 右上窗口 - 更新页面 -->
      <div
        class="absolute right-[-30px] top-[5%] w-[680px] transform perspective-1000 bg-element z-10 window-3d"
        style="animation-delay: 0.6s"
      >
        <img
          src="/images/update.webp"
          alt="更新页面"
          class="w-full h-auto rounded-xl shadow-xl float-animation"
          style="--float-delay: 0.6s"
          draggable="false"
        />
      </div>

      <!-- 中间窗口 - 关于页面 -->
      <div
        class="absolute right-[100px] top-[35%] w-[680px] transform perspective-1000 bg-element z-15 window-3d"
        style="animation-delay: 0.65s"
      >
        <img
          src="/images/about.webp"
          alt="关于页面"
          class="w-full h-auto rounded-xl shadow-xl float-animation"
          style="--float-delay: 0.75s"
          draggable="false"
        />
      </div>

      <!-- 左下窗口 - 自动化页 -->
      <div
        class="absolute right-[80px] bottom-[-15%] w-[680px] transform perspective-1000 bg-element z-10 window-3d"
        style="animation-delay: 0.7s"
      >
        <img
          src="/images/ciautoedit.webp"
          alt="自动化页"
          class="w-full h-auto rounded-xl shadow-xl float-animation"
          style="--float-delay: 0.9s"
          draggable="false"
        />
      </div>
    </div>

    <div class="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card mx-auto max-w-5xl card-entrance">
        <div
          class="flex flex-col lg:flex-row items-center gap-6 lg:gap-20 py-6 lg:py-14 px-4 sm:px-6 lg:px-20"
        >
          <div
            class="w-full lg:w-1/3 flex items-center justify-center card-item"
            style="--delay: 0.1s"
          >
            <div
              class="w-48 h-48 lg:w-80 lg:h-80 flex items-center justify-center"
            >
              <img
                src="/images/logo.webp"
                alt="EasiAuto Logo"
                class="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div
            class="w-full lg:w-3/4 flex flex-col items-center lg:items-start gap-2"
          >
            <div
              class="flex items-end gap-4 flex-wrap justify-center lg:justify-start card-item"
              style="--delay: 0.2s"
            >
              <h1
                class="text-[3rem] lg:text-[6rem] font-medium text-titleGreen leading-none"
              >
                EasiAuto
              </h1>
              <span v-if="latestVersion" class="version-tag mb-2">{{
                latestVersion.split(".").slice(0, 2).join(".")
              }}</span>
            </div>

            <p
              class="text-subtitleGreen text-base lg:text-2xl font-normal mb-4 card-item text-center lg:text-left"
              style="--delay: 0.3s"
            >
              一款自动登录希沃白板的小工具
            </p>

            <p
              class="text-white text-xl lg:text-3xl font-normal leading-relaxed lg:tracking-wide card-item text-center lg:text-left"
              style="--delay: 0.4s"
            >
              更<span class="highlight">智能</span>、更<span class="highlight"
                >方便</span
              >、更<span class="highlight">易用</span>的<br />
              希沃白板登录体验
            </p>

            <div
              class="flex flex-col sm:flex-row gap-4 pt-4 card-item items-center justify-center lg:justify-start w-full sm:w-auto"
              style="--delay: 0.5s"
            >
              <!-- 下载按钮 -->
              <DownloadButton class="w-full sm:w-auto" />

              <a
                href="https://github.com/hxabcd/EasiAuto"
                target="_blank"
                rel="noopener"
                class="btn-secondary flex items-center justify-center gap-2 w-full h-[52px] sm:w-auto"
              >
                <GitHubIcon size="24" />
                GitHub 仓库
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下滑提示 -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white transition-colors scroll-hint"
      @click="scrollToContent"
    >
      <!-- <span class="text-sm">向下滚动</span> -->
      <ChevronDown class="w-6 h-6 animate-bounce" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { GitHubIcon } from "vue3-simple-icons";
import DownloadButton from "./DownloadButton.vue";
import WarningBanner from "./WarningBanner.vue";
import { useVersionStore } from "../stores/versionStore";

const latestVersion = ref("");
const showBanner = ref(true);

const { fetchVersionData } = useVersionStore();

// 获取版本号（用于显示）
const fetchVersionInfo = async () => {
  try {
    const data = await fetchVersionData();
    if (data.latest) {
      latestVersion.value = data.latest;
    }
  } catch (error) {
    console.error("获取版本信息失败:", error);
  }
};

// 滚动到内容区域
const scrollToContent = () => {
  const featuresSection = document.getElementById("features");
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: "smooth" });
  }
};

const closeBanner = () => {
  showBanner.value = false;
};

onMounted(() => {
  fetchVersionInfo();
});
</script>

<style scoped>
.glass-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 4px solid #05f175;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.version-tag {
  background: #05f175;
  color: #275317;
  font-size: 1.5rem;
  font-weight: 900;
  padding: 0.15rem 0.7rem;
  border-radius: 0.6rem;
}

@media (max-width: 1024px) {
  .version-tag {
    font-size: 1rem;
    padding: 0.1rem 0.5rem;
    border-radius: 0.4rem;
  }
}

.highlight {
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 8px;
  background: #05f175;
  opacity: 0.4;
  z-index: -1;
  border-radius: 2px;
}

@media (max-width: 1023px) {
  .highlight {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .highlight::after {
    bottom: 4px;
    height: 4px;
    border-radius: 2px;
  }
}

/* 移动端卡片优化 */
@media (max-width: 640px) {
  .glass-card {
    border-width: 2px;
    border-radius: 1rem;
    margin: 0 0.5rem;
  }
}

/* 小屏幕手机优化 */
@media (max-width: 480px) {
  .glass-card {
    margin: 0;
  }
}

/* 卡片入场动画 */
.card-entrance {
  animation: cardSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

@keyframes cardSlideUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 卡片内元素依次出现 */
.card-item {
  opacity: 0;
  transform: translateY(20px);
  animation: itemFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes itemFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 下滑提示动画 */
.scroll-hint {
  opacity: 0;
  animation: hintFadeIn 0.6s ease forwards;
  animation-delay: 1s;
}

@keyframes hintFadeIn {
  to {
    opacity: 1;
  }
}

/* 背景元素动画 */
.bg-element {
  opacity: 0;
  animation: bgFadeIn 1.2s ease forwards;
}

@keyframes bgFadeIn {
  to {
    opacity: 1;
  }
}

/* 3D 窗口容器 */
.window-3d {
  transform-style: preserve-3d;
}

.window-3d img {
  transform: rotateX(26deg) rotateY(18deg);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
}

/* 浮动动画 */
.float-animation {
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

@keyframes float {
  0%,
  100% {
    transform: rotateX(26deg) rotateY(18deg) translateY(0px);
  }
  50% {
    transform: rotateX(26deg) rotateY(18deg) translateY(-10px);
  }
}

/* 页面加载时的初始状态 */
section {
  opacity: 0;
  animation: pageLoad 0.3s ease forwards;
}

@keyframes pageLoad {
  to {
    opacity: 1;
  }
}
</style>
