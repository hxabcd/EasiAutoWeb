<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- 弹窗内容 -->
        <div
          class="relative bg-darkLight border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          <!-- 关闭按钮 -->
          <button
            @click="close"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- 标题 -->
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Download class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">感谢下载 !</h3>
            <p class="text-gray-400">
              EasiAuto <span class="text-primary">v{{ version }}</span>
            </p>
          </div>

          <!-- SHA256 校验和 -->
          <div class="mb-6">
            <label class="block text-sm text-gray-400 mb-2"
              >SHA256 校验和</label
            >
            <div class="relative">
              <input
                type="text"
                :value="sha256"
                readonly
                class="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300 font-mono pr-24"
              />
              <button
                @click="copySha256"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-sm rounded-md transition-colors flex items-center gap-1.5"
              >
                <Check v-if="copied" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
                {{ copied ? "已复制" : "复制" }}
              </button>
            </div>
          </div>

          <!-- 提示文本 -->
          <div
            class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
          >
            <div class="flex items-start gap-3">
              <AlertTriangle
                class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
              />
              <p class="text-sm text-yellow-200/80 leading-relaxed">
                EasiAuto 是便携版软件 ，需要完整解压到文件夹（如
                <code
                  class="bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-300 font-mono"
                  >D:\EasiAuto</code
                >
                ）才能使用
              </p>
            </div>
          </div>

          <!-- 确认按钮 -->
          <button @click="close" class="w-full mt-6 btn-primary py-3">
            知道了
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import { Download, X, Copy, Check, AlertTriangle } from "lucide-vue-next";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  version: {
    type: String,
    default: "",
  },
  sha256: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const copied = ref(false);

const close = () => {
  emit("close");
};

const copySha256 = async () => {
  try {
    await navigator.clipboard.writeText(props.sha256);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
  }
};

// 重置复制状态当弹窗关闭时
watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      copied.value = false;
    }
  }
);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: all 0.3s ease;
}
</style>
