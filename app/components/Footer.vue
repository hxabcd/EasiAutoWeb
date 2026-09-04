<template>
  <footer class="py-8 px-4 border-t border-gray-800">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex flex-col md:flex-row items-center gap-x-5 gap-y-2">
          <div class="flex items-center gap-3">
            <img
              src="/images/EasiAuto.webp"
              alt="EasiAuto Logo"
              class="w-8 h-8 rounded"
            />
            <span class="text-xl font-bold text-white">EasiAuto</span>
          </div>
          <p class="text-gray-500 text-sm">
            © {{ new Date().getFullYear() }}
            <a
              href="https://github.com/hxabcd"
              target="_blank"
              rel="noopener"
              class="text-gray-400 hover:text-primary transition-colors"
              >HxAbCd</a
            >
            <span class="hidden md:inline px-2">|</span>
            <br class="md:hidden" />
            Licensed under GPL v3.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <a
            href="https://github.com/hxabcd/EasiAuto"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
            title="GitHub"
          >
            <Icon name="simple-icons:github" class="w-6 h-6" />
          </a>
          <a
            href="https://qm.qq.com/q/bFXGjjDENG"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
            title="QQ 群"
          >
            <Icon name="simple-icons:tencentqq" class="w-6 h-6" />
          </a>
          <a
            href="https://space.bilibili.com/401002238"
            target="_blank"
            rel="noopener"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 hover:text-primary hover:bg-gray-800 transition-all"
            title="哔哩哔哩"
          >
            <Icon name="simple-icons:bilibili" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
