// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: { prerender: { failOnError: false } },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/test-utils/module', '@vite-pwa/nuxt'],
  typescript: {
    // typeCheck: true,
    // strict: true
  },
  pwa: {
    devOptions: {
      enabled: true
    }
  },
  ssr: false
  // nitro: { prerender: { failOnError: false } }
})
