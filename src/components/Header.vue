<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a
          href="#"
          class="flex items-center gap-3 cursor-pointer"
          @click.prevent="scrollToTop"
        >
          <img
            src="/images/logo.webp"
            alt="EasiAuto Logo"
            class="w-8 h-8 rounded"
          />
          <span class="text-xl font-bold text-white">EasiAuto</span>
        </a>
        <nav class="hidden md:flex items-center gap-8">
          <a
            href="#features"
            class="text-gray-300 hover:text-primary transition-colors"
            >功能</a
          >
          <a
            href="#screenshots"
            class="text-gray-300 hover:text-primary transition-colors"
            >界面</a
          >
          <a
            href="#cta"
            class="btn-primary text-sm inline-flex items-center gap-2"
          >
            <Download class="w-4 h-4" />
            下载
          </a>
        </nav>
        <button class="md:hidden text-gray-300">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Download } from "lucide-vue-next";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
