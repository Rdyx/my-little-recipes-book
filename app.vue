<script setup lang="ts">
const isSettingsMenuOpen = ref(false)
</script>

<template>
  <UContainer class="w-full">
    <CoreNavBar @open-settings-menu="isSettingsMenuOpen = true" />
    <SettingsSMenu :is-open="isSettingsMenuOpen" @close="isSettingsMenuOpen = false" />

    <!-- Toasts -->
    <UNotifications />

    <!-- PWA Related -->
    <NuxtPwaManifest />
    <CorePWA />

    <!-- Page Content -->
    <UContainer class="flex justify-center w-full h-[calc(100vh-56px)] overflow-auto">
      <NuxtPage class="px-3 w-full md:px-0 md:w-3/4 flex flex-col" />
    </UContainer>
  </UContainer>
</template>
