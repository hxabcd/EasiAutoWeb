<template>
  <section id="cta" class="py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <div
        class="relative bg-gradient-to-br from-primary/20 to-primaryDark/20 rounded-3xl p-12 border border-primary/30"
      >
        <div class="absolute inset-0 bg-primary/5 blur-3xl rounded-3xl"></div>
        <div class="relative">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
            准备好开始了吗？
          </h2>
          <p class="text-gray-300 md:text-lg mb-8 max-w-xl mx-auto">
            下载 EasiAuto，让课前准备变得简单高效
          </p>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <DownloadButton class="w-full sm:w-auto" />
            <a
              href="https://github.com/hxabcd/EasiAuto"
              target="_blank"
              rel="noopener"
              class="btn-secondary inline-flex items-center justify-center gap-2 w-full h-[52px] sm:w-auto"
            >
              <Star class="w-5 h-5" />
              Star 项目
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star } from "lucide-vue-next";
import DownloadButton from "./DownloadButton.vue";
</script>

<style scoped></style>
