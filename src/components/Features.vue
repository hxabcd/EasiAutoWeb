<template>
  <section id="features" class="pt-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">核心功能</h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          多样化功能，让登录一步到位
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
      >
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="[
            'bg-darkLight rounded-2xl p-8 border border-gray-800 card-hover animate-on-scroll',
            `animate-delay-${index * 100}`,
          ]"
        >
          <div
            class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
          >
            <component :is="feature.icon" class="w-7 h-7 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>

      <div
        class="bg-dark rounded-2xl p-8 border border-gray-800 my-10 animate-on-scroll animate-delay-100"
      >
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <img
                src="/images/ClassIsland.svg"
                alt="ClassIsland"
                class="w-8 h-8"
              />
              <h3 class="text-2xl font-bold text-white">ClassIsland 集成</h3>
            </div>
            <p class="text-gray-400 mb-6">
              推荐同时安装 ClassIsland，
              在指定课程开始时自动执行登录任务，实现全自动登录的智慧教学新体验。
              可在软件的「自动化」界面中快速配置 ClassIsland 自动化。
            </p>
            <a
              href="https://www.classisland.tech"
              target="_blank"
              rel="noopener"
              class="btn-secondary hover:text-[#2196f3] hover:border-[#2196f3] inline-flex items-center gap-2"
            >
              了解 ClassIsland
              <ArrowRight class="w-4 h-4" />
            </a>
          </div>
          <div class="flex-1">
            <div class="bg-darkLight rounded-xl p-6 border border-gray-700">
              <h4 class="text-lg font-semibold text-primary mb-4">系统需求</h4>
              <ul class="text-gray-300 space-y-2">
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  Windows 10 及以上版本
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  已安装 希沃白板
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  已安装 ClassIsland 并配置好时间表和课表
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Lock,
  Settings,
  AlertTriangle,
  Flag,
  Download,
  MoreHorizontal,
  ArrowRight,
} from "lucide-vue-next";

const features = ref([
  {
    icon: Lock,
    title: "完备的登录方式",
    description: "具有固定位置、图像识别、自动定位、进程注入四种登录方案",
  },
  {
    icon: Settings,
    title: "易用的设置界面",
    description: "使用 QFluentWidget 构建的现代化设置界面，样式美观，操作直观",
  },
  {
    icon: AlertTriangle,
    title: "运行前警告弹窗",
    description: "自动运行不再措不及防，还可暂时推迟登录",
  },
  {
    icon: Flag,
    title: "醒目的横幅警示",
    description: "兼具实用性与视觉冲击力，同时支持高度自定义",
  },
  {
    icon: Download,
    title: "自动更新",
    description: "及时接收功能增强和问题修复，保持最新版本",
  },
  {
    icon: MoreHorizontal,
    title: "更多功能",
    description: "单次跳过、错误重试、兼容模式……",
  },
]);
</script>

<style scoped></style>
