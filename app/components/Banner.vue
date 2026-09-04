<template>
  <section
    ref="sectionRef"
    :style="{ '--hero-t': heroT }"
    class="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center herodesk:justify-start pt-16 herodesk:pt-10"
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
      <WarningBanner :height="bannerHeightPx" />
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
      <div class="absolute inset-0 dot-grid opacity-20 herodesk:right-[60%]"></div>
    </div>

    <!-- 背景：浅色窗口截图倾斜平铺（桌面端集中在右侧），三行左-右-左交错缓慢平移 -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none select-none hidden herodesk:block herodesk:left-[40%] herodesk:[mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.5)_18%,black_34%)]"
      aria-hidden="true"
    >
      <div
        class="absolute inset-[-60%] flex flex-col justify-center gap-6 herodesk:gap-8 rotate-20"
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

    <div
      class="hero-grid relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 herodesk:max-w-[1920px] herodesk:px-0"
    >
      <div
        ref="cardRef"
        class="hero-card backdrop-blur-[18px] mx-auto max-w-5xl card-entrance herodesk:mx-0 herodesk:max-w-none herodesk:col-start-2 herodesk:aspect-[11/5] @container"
        :class="{ 'is-resizing': isResizing }"
      >
        <div
          class="flex flex-col herodesk:flex-row items-center gap-6 herodesk:gap-[7.8125cqw] py-6 herodesk:py-[5.46875cqw] px-4 sm:px-6 herodesk:px-[7.8125cqw]"
        >
          <div
            class="w-full herodesk:w-1/3 flex items-center justify-center card-item"
            style="--delay: 0.1s"
          >
            <div
              class="w-32 h-32 herodesk:w-[28cqw] herodesk:h-[28cqw] flex items-center justify-center"
            >
              <img
                src="/images/EasiAuto.webp"
                alt="EasiAuto Logo"
                class="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div
            class="w-full herodesk:w-3/4 flex flex-col items-center herodesk:items-start gap-2"
          >
            <div
              class="flex items-end gap-4 flex-wrap justify-center herodesk:justify-start card-item"
              style="--delay: 0.2s"
            >
              <h1
                class="text-[3rem] herodesk:text-[9.375cqw] font-medium text-title-green leading-none"
              >
                EasiAuto
              </h1>
              <span v-if="latestVersion" class="version-tag mb-2 herodesk:mb-[0.78125cqw]">{{
                latestVersion.split(".").slice(0, 2).join(".")
              }}</span>
            </div>

            <p
              class="text-subtitle-green text-base herodesk:text-[2.34375cqw] font-normal mb-4 herodesk:mb-[1.5625cqw] card-item text-center herodesk:text-left"
              style="--delay: 0.3s"
            >
              一款自动登录希沃白板的小工具
            </p>

            <p
              class="text-white text-xl herodesk:text-[2.9296875cqw] font-normal leading-relaxed herodesk:tracking-wide card-item text-center herodesk:text-left"
              style="--delay: 0.4s"
            >
              更<span class="highlight">智能</span>、更<span class="highlight"
                >方便</span
              >、更<span class="highlight">易用</span>的<br />
              希沃白板登录体验
            </p>

            <div
              class="flex flex-col sm:flex-row gap-4 herodesk:gap-[1.5625cqw] pt-4 herodesk:pt-[1.5625cqw] card-item items-center justify-center herodesk:justify-start w-full sm:w-auto"
              style="--delay: 0.5s"
            >
              <!-- 下载按钮 -->
              <DownloadButton class="w-full sm:w-auto" more-to="/download" />

              <a
                href="https://github.com/hxabcd/EasiAuto"
                target="_blank"
                rel="noopener"
                class="btn-secondary flex items-center justify-center gap-2 herodesk:gap-[0.78125cqw] w-full h-[52px] herodesk:h-[5.078125cqw] sm:w-auto herodesk:px-[3.125cqw] herodesk:py-[1.171875cqw]"
              >
                <Icon name="simple-icons:github" class="w-6 h-6 herodesk:w-[2.34375cqw] herodesk:h-[2.34375cqw]" />
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

// 警告横幅实际渲染高度（px）：移动端 88px、中屏 110px，桌面端为主卡片高度的 25%
const bannerHeightPx = ref(110)

// 视口比例 r ∈ [8:9, 10:9) 时 --hero-t 线性插值（0 = r=10:9 → 1:9:1，1 = r=8:9 → 1:22:1），
// 驱动卡片列 9fr→22fr 平滑过渡；SSR/首帧默认中点 0.5，渲染后随 resize 更新
const heroT = ref(0.5)
const updateHeroT = () => {
  const r = window.innerWidth / window.innerHeight
  heroT.value = Math.min(1, Math.max(0, (10 / 9 - r) / (10 / 9 - 8 / 9)))
}

// 横幅区域由 section 几何推算（absolute top-14 即 56px），
// 不测量横幅自身——v-show 隐藏时它的矩形是全零，会导致误判
// 间距阈值为 -16：横幅底部最多可遮挡主卡片顶部 16px，此时仍显示
const checkOverlap = () => {
  const section = sectionRef.value
  const card = cardRef.value
  if (!section || !card) return
  const s = section.getBoundingClientRect()
  const c = card.getBoundingClientRect()
  const mq = window.matchMedia
  const bannerHeight = mq("(max-width: 640px)").matches
    ? 88
    : mq("(min-aspect-ratio: 8/9)").matches
      ? c.height * 0.25
      : 110
  bannerHeightPx.value = Math.min(bannerHeight, 100)
  const bannerBottom = s.top + 56 + bannerHeightPx.value
  bannerFits.value = bannerBottom <= c.top + 16
}

// 等布局与卡片入场动画（0.8s）基本稳定后再测量，二次测量兜底
let overlapTimers = []

// 窗口拖拽缩放期间（及停止后 150ms 内）标记 is-resizing：
// 卡内按钮带 transition-all，cqw 尺寸变化时会产生缓动追赶，需临时禁用过渡
const isResizing = ref(false)
let resizeEndTimer
const onWindowResize = () => {
  isResizing.value = true
  clearTimeout(resizeEndTimer)
  resizeEndTimer = setTimeout(() => {
    isResizing.value = false
  }, 150)
}

onMounted(() => {
  overlapTimers = [setTimeout(checkOverlap, 200), setTimeout(checkOverlap, 1000)]
  window.addEventListener("resize", checkOverlap)
  window.addEventListener("resize", onWindowResize)
  updateHeroT()
  window.addEventListener("resize", updateHeroT)
})

onUnmounted(() => {
  overlapTimers.forEach(clearTimeout)
  window.removeEventListener("resize", checkOverlap)
  window.removeEventListener("resize", onWindowResize)
  window.removeEventListener("resize", updateHeroT)
  clearTimeout(resizeEndTimer)
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
/* 主卡片 */
.hero-card {
  background: rgba(0, 0, 0, 0.4);
  border: 4px solid #05f175;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 窗口缩放期间（is-resizing）禁止卡内元素过渡，尺寸瞬时跟随 */
.hero-card.is-resizing,
.hero-card.is-resizing :deep(*) {
  transition: none !important;
}

.version-tag {
  background: #05f175;
  color: #275317;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.15rem 0.7rem;
  border-radius: 0.6rem;
}

@media (max-aspect-ratio: 8/9) {
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

@media (max-aspect-ratio: 8/9) {
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
@media (max-aspect-ratio: 8/9) {
  .hero-card {
    border-width: 2px;
    border-radius: 1rem;
    margin: 0 0.5rem;
  }
}

/* 小屏幕手机优化 */
@media (max-aspect-ratio: 8/9) and (max-width: 480px) {
  .hero-card {
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

/* 桌面端（视口比例 ≥ 8:9）：布局分档 spacing:hero-card:spacing——
   r ≥ 14:9 为 1:12:7；10:9 ≤ r < 14:9 为 1:9:1；8:9 ≤ r < 10:9 时
   卡片列 9fr→22fr 线性插值（r 越低卡片越宽，由 --hero-t 驱动）。
   卡片宽高比 11:5，内部元素以容器查询单位 cqw 随卡片宽度等比缩放。
   卡片自身的边框/圆角/虚化无法使用自身 cq 单位，改用 --cq2vw 换算（1cqw ≈ 卡片宽/视口宽 × 1vw，
   各分档精确取值；超宽屏 >1920px 时由 min() 上限约束）。 */
@media (min-aspect-ratio: 8/9) {
  /* 网格：卡片居中列，两侧 1fr 留白；默认档 1:22:1（8:9 处） */
  .hero-grid {
    display: grid;
    --hero-cols: 1fr 22fr 1fr;
    grid-template-columns: var(--hero-cols);
  }

  .hero-card {
    margin: 0;
    --cq2vw: calc(22 / 24);
    border-width: min(calc(var(--cq2vw) * 0.39053vw), 4.05px);
    border-radius: min(calc(var(--cq2vw) * 2.3436vw), 24.2px);
    backdrop-filter: blur(min(calc(var(--cq2vw) * 1.75764vw), 18.2px));
  }

  .version-tag {
    font-size: 2.34375cqw;
    padding: 0.234375cqw 1.09375cqw;
    border-radius: 0.9375cqw;
  }

  .highlight {
    font-size: 3.125cqw;
  }

  .highlight::after {
    bottom: 0.46875cqw;
    height: 0.78125cqw;
    border-radius: 0.1953125cqw;
  }

  /* 下载按钮子组件内部固定尺寸同样等比缩放 */
  .hero-card :deep(.dbtn-main) {
    gap: 0.78125cqw;
    padding: 0.78125cqw 1.5625cqw;
  }  .hero-card :deep(.dbtn-title) {
    font-size: 1.3671875cqw;
  }
  .hero-card :deep(.dbtn-sub) {
    font-size: 1.171875cqw;
  }
  .hero-card :deep(.dbtn-more) {
    padding: 0 1.5625cqw 0 1.171875cqw;
  }
  .hero-card :deep(.dbtn-icon-lg) {
    width: 1.953125cqw;
    height: 1.953125cqw;
  }
  .hero-card :deep(.dbtn-icon-sm) {
    width: 1.5625cqw;
    height: 1.5625cqw;
  }

  /* GitHub 按钮文字随卡片等比缩放（1024px 设计宽度下为 16px） */
  .hero-card .btn-secondary {
    font-size: 1.5625cqw;
  }
}

/* 8:9 ≤ r < 10:9：卡片列 9fr→22fr 线性插值（总列数 11 + 13t，精确 fr 换算为百分比） */
@media (min-aspect-ratio: 8/9) and (max-aspect-ratio: 10/9) {
  .hero-grid {
    --hero-cols:
      calc(100% / (11 + 13 * var(--hero-t)))
      calc(100% * (9 + 13 * var(--hero-t)) / (11 + 13 * var(--hero-t)))
      calc(100% / (11 + 13 * var(--hero-t)));
  }
  .hero-card {
    --cq2vw: calc((9 + 13 * var(--hero-t)) / (11 + 13 * var(--hero-t)));
  }
}

/* 10:9 ≤ r < 14:9：固定 1:9:1 */
@media (min-aspect-ratio: 10/9) {
  .hero-grid {
    --hero-cols: 1fr 9fr 1fr;
  }
  .hero-card {
    --cq2vw: calc(9 / 11);
  }
}

/* r ≥ 14:9：固定 1:12:7 */
@media (min-aspect-ratio: 14/9) {
  .hero-grid {
    --hero-cols: 1fr 12fr 7fr;
  }
  .hero-card {
    --cq2vw: calc(12 / 20);
  }
}
</style>
