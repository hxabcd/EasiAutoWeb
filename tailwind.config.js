/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C884',
        primaryDark: '#00a06d',
        primaryLight: '#33d39d',
        dark: '#0f172a',
        darkLight: '#1e293b',
        borderGreen: '#05F175',
        titleGreen: '#CDFFE4',
        subtitleGreen: '#E1EFE4',
        gradientTop: '#3C7557',
        gradientBottom: '#0BA349',
      },
      fontFamily: {
        sans: ['HarmonyOS Sans SC', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
