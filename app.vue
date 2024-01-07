<script setup>
const isLinksMenuOpen = ref(false)
const isSettingsMenuOpen = ref(false)
</script>

<template>
  <div>
    <NavBar @open-links-menu="isLinksMenuOpen = true" />
    <SideMenu :is-open="isSettingsMenuOpen" @close="isSettingsMenuOpen = false">
      <SettingsMenu @close="isSettingsMenuOpen = false" />
    </SideMenu>
    <SideMenu
      :is-open="isLinksMenuOpen"
      :is-settings-menu-open="isSettingsMenuOpen"
      @close="isLinksMenuOpen = false"
    >
      <LinksMenu @open-settings-menu="isSettingsMenuOpen = true" @close="isLinksMenuOpen = false" />
    </SideMenu>

    <NuxtLink to="/"> Home </NuxtLink>

    <NuxtPage />
  </div>
</template>
