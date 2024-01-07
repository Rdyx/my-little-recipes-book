<script setup>
const isSettingsMenuOpen = ref(false)

const closeSettingsMenu = () => {
  isSettingsMenuOpen.value = false
}
</script>

<template>
  <div>
    <NavBar @open-settings-menu="isSettingsMenuOpen = true" />
    <SettingsMenu :is-open="isSettingsMenuOpen" @close="closeSettingsMenu()" />

    <!-- Toasts -->
    <UNotifications />
    <!-- PWA Related -->
    <NuxtPwaManifest />
    <PWA />

    <!-- Page Content -->
    <NuxtPage />
  </div>
</template>
