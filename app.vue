<script setup>
const isSettingsMenuOpen = ref(false)
</script>

<template>
  <div>
    <CoreNavBar @open-settings-menu="isSettingsMenuOpen = true" />
    <SettingsMenu :is-open="isSettingsMenuOpen" @close="isSettingsMenuOpen = false" />

    <!-- Toasts -->
    <UNotifications />

    <!-- PWA Related -->
    <NuxtPwaManifest />
    <CorePWA />

    <!-- Page Content -->
    <div class="flex justify-center w-full">
      <NuxtPage class="px-3 w-full md:px-0 md:w-3/4" />
    </div>
  </div>
</template>
