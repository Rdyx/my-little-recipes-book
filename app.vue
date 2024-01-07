<script setup>
const isLinksMenuOpen = ref(false)
const isSettingsMenuOpen = ref(false)

const closeLinksMenu = () => {
  if (isSettingsMenuOpen.value) return
  isLinksMenuOpen.value = false
}

const closeSettingsMenu = () => {
  isSettingsMenuOpen.value = false
}
</script>

<template>
  <div>
    <NavBar @open-links-menu="isLinksMenuOpen = true" />

    <LinksMenu
      :is-open="isLinksMenuOpen"
      @open-settings-menu="isSettingsMenuOpen = true"
      @close="closeLinksMenu()"
    />
    <SettingsMenu :is-open="isSettingsMenuOpen" @close="closeSettingsMenu()" />
    <UNotifications />

    <VitePwaManifest />
    <PWA />
    <NuxtPage />
  </div>
</template>
