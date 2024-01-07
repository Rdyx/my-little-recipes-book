<script setup>
// If you want to use it in setup, import from the nuxtApp.
const { $pwa } = useNuxtApp()

const toast = useToast()

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log($pwa, $pwa.offlineReady)
  // toast.add({ title: 'test' })
  if ($pwa.offlineReady) toast.add({ title: 'App ready to work offline' })
  if ($pwa.needRefresh) {
    toast.add({ title: 'refresh' })
  }
})
</script>

<template>
  <div v-show="$pwa.needRefresh">
    <!-- You can use $pwa directly in templates! -->
    <span> New content available, click on reload button to update. </span>

    <button @click="$pwa.updateServiceWorker()">Reload</button>
  </div>
</template>
