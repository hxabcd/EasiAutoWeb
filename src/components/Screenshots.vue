<template>
  <section id="screenshots" class="pt-20 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">界面展示</h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          使用 Fluent Design，简洁易用
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="setActiveTab(index)"
          :class="[
            'px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm',
            activeTab === index
              ? 'bg-primary text-white'
              : 'bg-darkLight text-gray-400 hover:text-white',
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="relative animate-on-scroll">
        <div class="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
        <div
          class="relative bg-dark rounded-2xl border border-gray-800 p-3 md:p-4"
        >
          <!-- 占位元素保持容器高度 -->
          <img
            :src="tabs[activeTab].image"
            class="rounded-xl w-full max-h-[560px] object-contain invisible"
            aria-hidden="true"
          />
          <!-- 实际显示的图片，绝对定位叠加 -->
          <div
            class="absolute inset-3 md:inset-4 flex items-center justify-center"
          >
            <transition name="fade" mode="out-in">
              <img
                :key="tabs[activeTab].name"
                :src="tabs[activeTab].image"
                :alt="tabs[activeTab].name"
                :class="[
                  'rounded-xl object-contain',
                  tabs[activeTab].name === '运行前警告'
                    ? 'max-h-[320px]'
                    : 'w-full h-full max-h-[560px]',
                ]"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeTab = ref(0);
let autoPlayInterval = null;

const tabs = ref([
  { name: "设置页面", image: "/images/setting.webp" },
  { name: "自动化页", image: "/images/ciautoedit.webp" },
  { name: "更新页面", image: "/images/update.webp" },
  { name: "运行前警告", image: "/images/warning.webp" },
]);

const setActiveTab = (index) => {
  activeTab.value = index;
  // 重置自动轮播计时器
  resetAutoPlay();
};

const nextTab = () => {
  activeTab.value = (activeTab.value + 1) % tabs.value.length;
};

const startAutoPlay = () => {
  autoPlayInterval = setInterval(nextTab, 5000); // 5 秒切换一次
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
