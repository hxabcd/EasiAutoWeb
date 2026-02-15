<template>
  <div ref="dropdownRef" class="relative flex items-center w-full sm:w-auto">
    <!-- 左侧：下载按钮 -->
    <div
      @click="downloadDefault"
      class="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-l-full rounded-r-none cursor-pointer bg-borderGreen hover:brightness-110 active:brightness-90 text-black font-semibold shadow-lg transition-all"
    >
      <Download class="w-5 h-5" />
      <div class="flex flex-col items-start">
        <span class="text-sm font-semibold">{{ buttonText }}</span>
        <span v-if="showVersion" class="text-xs text-gray-900 opacity-80">{{
          versionText
        }}</span>
      </div>
    </div>

    <!-- 右侧：展开下拉菜单 -->
    <div
      @click="toggleDropdown"
      class="self-stretch px-3 pr-4 rounded-r-full rounded-l-none cursor-pointer bg-borderGreen hover:brightness-110 active:brightness-90 text-black font-semibold shadow-lg border-l border-black/20 flex items-center transition-all"
    >
      <ChevronDown
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': showDropdown }"
      />
    </div>

    <!-- 下拉菜单 -->
    <transition name="dropdown">
      <div
        v-show="showDropdown"
        class="absolute top-full right-0 sm:left-0 mt-2 bg-darkLight border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50 min-w-[200px]"
      >
        <!-- 稳定版 -->
        <div class="px-3 py-2 text-xs text-gray-500 border-b border-gray-700">
          稳定版 v{{ stableVersion }}
        </div>
        <button
          @click="downloadStableFull"
          class="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <span class="flex-1">完整版</span>
          <span class="text-xs text-gray-400">推荐</span>
        </button>
        <button
          @click="downloadStableLite"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <span class="flex-1">精简版</span>
          <span class="text-xs text-gray-400">去除非必要组件</span>
        </button>
        <!-- 测试版 -->
        <div
          v-if="devVersion"
          class="px-3 py-2 text-xs text-gray-500 border-t border-b border-gray-700"
        >
          测试版 v{{ devVersion }}
        </div>
        <button
          v-if="devVersion"
          @click="downloadDevFull"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <span class="flex-1">完整版</span>
          <span class="text-xs text-yellow-500">测试</span>
        </button>
        <button
          v-if="devVersion"
          @click="downloadDevLite"
          class="w-full px-4 py-3 text-left text-white hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <span class="flex-1">精简版</span>
          <span class="text-xs text-yellow-500">测试</span>
        </button>
      </div>
    </transition>

    <!-- 下载弹窗 -->
    <DownloadModal
      :show="showModal"
      :version="modalVersion"
      :sha256="modalSha256"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Download, ChevronDown } from "lucide-vue-next";
import DownloadModal from "./DownloadModal.vue";
import { useVersionStore } from "../stores/versionStore";

const props = defineProps({
  buttonText: {
    type: String,
    default: "立即下载",
  },
  showVersion: {
    type: Boolean,
    default: true,
  },
});

const showDropdown = ref(false);
const showModal = ref(false);
const modalVersion = ref("");
const modalSha256 = ref("");
const stableVersion = ref("");
const devVersion = ref("");
const stableLinks = ref({ default: "", lite: "" });
const devLinks = ref({ default: "", lite: "" });
const stableSha256 = ref({ default: "", lite: "" });
const devSha256 = ref({ default: "", lite: "" });

const { fetchVersionData } = useVersionStore();

const versionText = computed(() => {
  if (stableVersion.value) {
    return `v${stableVersion.value} 完整版`;
  }
  return "完整版";
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showDropdown.value = false;
  }
};

const openDownloadModal = (version, sha256, url) => {
  modalVersion.value = version;
  modalSha256.value = sha256 || "暂无校验和";
  showModal.value = true;
  if (url) {
    window.open(url, "_blank");
  }
};

const downloadDefault = () => {
  downloadStableFull();
};

const downloadStableFull = () => {
  showDropdown.value = false;
  const url =
    stableLinks.value.default ||
    "https://github.com/hxabcd/EasiAuto/releases/latest";
  openDownloadModal(stableVersion.value, stableSha256.value.default, url);
};

const downloadStableLite = () => {
  showDropdown.value = false;
  const url =
    stableLinks.value.lite ||
    "https://github.com/hxabcd/EasiAuto/releases/latest";
  openDownloadModal(stableVersion.value, stableSha256.value.lite, url);
};

const downloadDevFull = () => {
  showDropdown.value = false;
  const url =
    devLinks.value.default ||
    "https://github.com/hxabcd/EasiAuto/releases/latest";
  openDownloadModal(devVersion.value, devSha256.value.default, url);
};

const downloadDevLite = () => {
  showDropdown.value = false;
  const url =
    devLinks.value.lite || "https://github.com/hxabcd/EasiAuto/releases/latest";
  openDownloadModal(devVersion.value, devSha256.value.lite, url);
};

const processVersionData = (data) => {
  // 获取稳定版
  if (data.latest) {
    stableVersion.value = data.latest;
  }
  // 获取测试版
  if (data.latest_dev) {
    devVersion.value = data.latest_dev;
  }

  // 获取稳定版下载链接和SHA256
  if (
    data.latest &&
    data.versions &&
    data.versions[data.latest] &&
    data.versions[data.latest].downloads
  ) {
    const downloads = data.versions[data.latest].downloads;
    if (Array.isArray(downloads)) {
      downloads.forEach((item) => {
        if (item.channel === "default") {
          if (item.url) stableLinks.value.default = item.url.trim();
          if (item.sha256) stableSha256.value.default = item.sha256;
        } else if (item.channel === "lite") {
          if (item.url) stableLinks.value.lite = item.url.trim();
          if (item.sha256) stableSha256.value.lite = item.sha256;
        }
      });
    }
  }

  // 获取测试版下载链接和SHA256
  if (
    data.latest_dev &&
    data.versions &&
    data.versions[data.latest_dev] &&
    data.versions[data.latest_dev].downloads
  ) {
    const devDownloads = data.versions[data.latest_dev].downloads;
    if (Array.isArray(devDownloads)) {
      devDownloads.forEach((item) => {
        if (item.channel === "default") {
          if (item.url) devLinks.value.default = item.url.trim();
          if (item.sha256) devSha256.value.default = item.sha256;
        } else if (item.channel === "lite") {
          if (item.url) devLinks.value.lite = item.url.trim();
          if (item.sha256) devSha256.value.lite = item.sha256;
        }
      });
    }
  }
};

const fetchVersionInfo = async () => {
  try {
    const data = await fetchVersionData();
    processVersionData(data);
  } catch (error) {
    console.error("获取版本信息失败:", error);
  }
};

onMounted(() => {
  fetchVersionInfo();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
