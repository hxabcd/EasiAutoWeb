<template>
  <section
    ref="sectionRef"
    class="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center lg:justify-start pt-16 lg:pt-10"
  >
    <!-- 公告条 - 悬浮于 Banner 区顶部，不占文档流空间 -->
    <div
      v-if="latestAnnouncement"
      class="absolute top-2 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
    >
      <AnnouncementBanner :item="latestAnnouncement" />
    </div>

    <!-- 警告横幅 - 空间足够（不遮挡主卡片）时才渲染，避免隐藏状态下空转 -->
    <div
      v-if="showBanner && bannerFits"
      class="absolute top-14 left-0 right-0 z-40 banner-fade-in"
    >
      <WarningBanner />
      <button
        @click="closeBanner"
        class="absolute -bottom-6 right-2 w-4 h-4 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full transition-colors z-50 shadow-lg"
      >
        <Icon name="lucide:x" class="w-3 h-3 text-white" />
      </button>
    </div>

    <div
      class="absolute inset-0 bg-linear-to-tl from-gradient-top to-gradient-bottom"
    ></div>

    <!-- 左侧装饰：柔光斑 + 点阵，避免渐变底过空 -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        class="glow-orb absolute -top-40 -left-24 w-[30rem] h-[30rem] rounded-full bg-white/10 blur-3xl"
      ></div>
      <div
        class="glow-orb absolute top-1/3 left-[30%] w-80 h-80 rounded-full bg-emerald-200/15 blur-3xl"
        style="animation-delay: -6s"
      ></div>
      <div
        class="glow-orb absolute -bottom-32 left-10 w-[26rem] h-[26rem] rounded-full bg-[#05f175]/15 blur-3xl"
        style="animation-delay: -12s"
      ></div>
      <div class="absolute inset-0 dot-grid opacity-20 lg:right-[60%]"></div>
    </div>

    <!-- 背景：浅色窗口截图倾斜平铺（桌面端集中在右侧），三行左-右-左交错缓慢平移 -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none select-none hidden lg:block lg:left-[40%] lg:[mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.5)_18%,black_34%)]"
      aria-hidden="true"
    >
      <div
        class="absolute inset-[-60%] flex flex-col justify-center gap-6 lg:gap-8 rotate-20"
      >
        <div
          v-for="(row, rowIndex) in tileRows"
          :key="rowIndex"
          class="tile-row"
        >
          <div
            class="tile-track"
            :class="{ 'tile-track-reverse': rowIndex % 2 === 1 }"
          >
            <img
              v-for="(src, i) in row"
              :key="i"
              :src="src"
              alt=""
              decoding="async"
              class="tile-img"
              draggable="false"
            />
            <img
              v-for="(src, i) in row"
              :key="i + row.length"
              :src="src"
              alt=""
              decoding="async"
              class="tile-img"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mx-0">
      <div ref="cardRef" class="glass-card backdrop-blur-[18px] mx-auto max-w-5xl card-entrance lg:mx-0 lg:ml-30">
        <div
          class="flex flex-col lg:flex-row items-center gap-6 lg:gap-20 py-6 lg:py-14 px-4 sm:px-6 lg:px-20"
        >
          <div
            class="w-full lg:w-1/3 flex items-center justify-center card-item"
            style="--delay: 0.1s"
          >
            <div
              class="w-32 h-32 lg:w-80 lg:h-80 flex items-center justify-center"
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
                class="text-[3rem] lg:text-[6rem] font-medium text-title-green leading-none"
              >
                EasiAuto
              </h1>
              <span v-if="latestVersion" class="version-tag mb-2">{{
                latestVersion.split(".").slice(0, 2).join(".")
              }}</span>
            </div>

            <p
              class="text-subtitle-green text-base lg:text-2xl font-normal mb-4 card-item text-center lg:text-left"
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
              <DownloadButton class="w-full sm:w-auto" more-to="/download" />

              <a
                href="https://github.com/hxabcd/EasiAuto"
                target="_blank"
                rel="noopener"
                class="btn-secondary flex items-center justify-center gap-2 w-full h-[52px] sm:w-auto"
              >
                <Icon name="simple-icons:github" class="w-6 h-6" />
                GitHub 仓库
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下滑提示 -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white transition-colors scroll-hint"
      @click="scrollToContent"
    >
      <Icon name="lucide:chevron-down" class="w-6 h-6 animate-bounce" />
    </div>
  </section>
</template>

<script setup>
const showBanner = ref(true)
// 测量确认有足够空间前不显示，避免页面加载时闪现
const bannerFits = ref(false)
const sectionRef = ref(null)
const cardRef = ref(null)

const { latestVersion } = useVersionData()
const { webAnnouncements } = useAnnouncements()
const latestAnnouncement = computed(() => webAnnouncements.value[0] || null)

// 浅色窗口截图：三行平铺，行间起点错开，平移方向左-右-左交错
const lightShots = [
  "/images/light/update-check.webp",
  "/images/light/oobe-patch.webp",
  "/images/light/oobe-login-method.webp",
  "/images/light/setting2.webp",
  "/images/light/profile-edit.webp",
  "/images/light/setting.webp",
  "/images/light/pre-run-popup.webp",
  "/images/light/update-log.webp",
  "/images/light/ci-running.webp",
  "/images/light/ci-auto-edit.webp",
  "/images/light/oobe-welcome.webp",
  ]

// 每行为错开起点的一份序列，模板中渲染两份以实现无缝循环
const tileRows = [0, 1, 2].map((row) => {
  return [...lightShots.slice(row * 3), ...lightShots.slice(0, row * 3)]
})

// 横幅区域由 section 几何推算（absolute top-14 即 56px，高 110px），
// 不测量横幅自身——v-show 隐藏时它的矩形是全零，会导致误判
// 间距阈值为 -16：横幅底部最多可遮挡主卡片顶部 16px，此时仍显示
const checkOverlap = () => {
  const section = sectionRef.value
  const card = cardRef.value
  if (!section || !card) return
  const s = section.getBoundingClientRect()
  const c = card.getBoundingClientRect()
  // 横幅 top-14 即 56px；高度移动端收窄为 88px，桌面端 110px
  const bannerHeight = window.matchMedia('(max-width: 640px)').matches ? 88 : 110
  const bannerBottom = s.top + 56 + bannerHeight
  bannerFits.value = bannerBottom <= c.top + 16
}

// 等布局与卡片入场动画（0.8s）基本稳定后再测量，二次测量兜底
let overlapTimers = []

onMounted(() => {
  overlapTimers = [setTimeout(checkOverlap, 200), setTimeout(checkOverlap, 1000)]
  window.addEventListener("resize", checkOverlap)
})

onUnmounted(() => {
  overlapTimers.forEach(clearTimeout)
  window.removeEventListener("resize", checkOverlap)
})

// 滚动到内容区域
const scrollToContent = () => {
  const featuresSection = document.getElementById("features")
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: "smooth" })
  }
}

const closeBanner = () => {
  showBanner.value = false
}
</script>

<style scoped>
.glass-card {
  background: rgba(0, 0, 0, 0.4);
  border: 4px solid #05f175;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.version-tag {
  background: #05f175;
  color: #275317;
  font-size: 1.5rem;
  font-weight: 700;
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
  bottom: 0.3rem;
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

/* 倾斜平铺窗口背景：行间水平错位，行轨道无缝平移 */
.tile-row:nth-child(2) {
  transform: translateX(-14%);
}

.tile-row:nth-child(3) {
  transform: translateX(-7%);
}

.tile-track {
  display: flex;
  width: max-content;
  animation: tilePan 300s linear infinite;
}

.tile-track-reverse {
  animation-direction: reverse;
}

.tile-img {
  height: clamp(180px, 26vh, 320px);
  width: auto;
  margin-right: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 15px 35px -12px rgba(0, 0, 0, 0.35);
}

@keyframes tilePan {
  to {
    transform: translateX(-50%);
  }
}

/* 左侧装饰：光斑缓慢漂移 + 点阵纹理 */
.glow-orb {
  animation: orbDrift 18s ease-in-out infinite alternate;
}

@keyframes orbDrift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(3rem, -2rem, 0) scale(1.08);
  }
}

.dot-grid {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.45) 1.5px,
    transparent 1.5px
  );
  background-size: 30px 30px;
}

@media (prefers-reduced-motion: reduce) {
  .tile-track,
  .glow-orb {
    animation: none;
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

/* 警告横幅出现时渐显 */
.banner-fade-in {
  animation: bannerFadeIn 0.5s ease-out;
}

@keyframes bannerFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
