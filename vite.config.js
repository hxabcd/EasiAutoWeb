import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Font from "vite-plugin-font";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Font.vite({
      scanFiles: ["src/**/*.{vue,ts,tsx,js,jsx}"],
    }),
  ],
});
