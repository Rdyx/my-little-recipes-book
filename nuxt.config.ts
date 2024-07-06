// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/test-utils/module', '@vite-pwa/nuxt', '@formkit/auto-animate'],

  build: {
    transpile: ['rxjs']
  },

  imports: {
    presets: [
      {
        from: '@vueuse/rxjs',
        imports: ['useObservable', 'from']
      },
      {
        from: 'dexie',
        imports: ['liveQuery']
      }
    ]
  },

  ui: {
    icons: ['heroicons', 'material-symbols']
  },

  typescript: {
    typeCheck: true,
    strict: true
  },

  pwa: {
    manifest: {
      name: 'My Little Recipes Book',
      short_name: 'MLRB',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },

  compatibilityDate: '2024-07-06'
})
