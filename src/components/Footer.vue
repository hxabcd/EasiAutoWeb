<template>
  <footer class="py-8 px-4 border-t border-gray-800">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <img
            src="/images/logo.webp"
            alt="EasiAuto Logo"
            class="w-8 h-8 rounded"
          />
          <span class="text-xl font-bold text-white">EasiAuto</span>
        </div>

        <div class="flex items-center gap-2">
          <a
            href="https://github.com/hxabcd/EasiAuto"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
            title="GitHub"
          >
            <GitHubIcon size="24" />
          </a>
          <a
href="https://qm.qq.com/q/bFXGjjDENG"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
           title="QQ 群"
          >
            <QqIcon size="24" />
          </a>
          <a
            href="https://space.BilibiliIcon.com/401002238"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
            title="BilibiliIcon"
          >
            <BilibiliIcon size="24" />
          </a>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-800 text-center">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }}
          <a
            href="https://github.com/hxabcd"
            target="_blank"
            rel="noopener"
            class="text-gray-400 hover:text-primary transition-colors"
            >HxAbCd</a
          >
          <span class="font-xl px-2">|</span>
          Licensed under GPL v3.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { GitHubIcon, QqIcon, BilibiliIcon } from "vue3-simple-icons";
</script>

<style scoped></style>
