<template>
  <div class="flex min-h-screen flex-col gradient-bg">
    <Header />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <Footer />
  </div>
</template>
