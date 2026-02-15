<template>
  <div class="min-h-screen gradient-bg">
    <Header />
    <main>
      <Banner />
      <Features />
      <Screenshots />
      <Cta />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import Features from "./components/Features.vue";
import Screenshots from "./components/Screenshots.vue";
import Cta from "./components/Cta.vue";
import Footer from "./components/Footer.vue";
</script>

<style></style>
