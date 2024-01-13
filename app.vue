<script setup>
const isSettingsMenuOpen = ref(false)

const closeSettingsMenu = () => {
  isSettingsMenuOpen.value = false
}
</script>

<template>
  <div>
    <CoreNavBar @open-settings-menu="isSettingsMenuOpen = true" />
    <SettingsSMenu :is-open="isSettingsMenuOpen" @close="closeSettingsMenu()" />

    <!-- Toasts -->
    <UNotifications />

    <!-- PWA Related -->
    <NuxtPwaManifest />
    <CorePWA />

    <!-- Page Content -->
    <NuxtPage />
  </div>
</template>
