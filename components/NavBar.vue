<script setup lang="ts">
const emit = defineEmits(['openSettingsMenu'])

const links = [
  [
    {
      label: 'Home',
      to: '/',
      icon: 'i-heroicons-home-modern'
    },
    {
      label: 'My Ingredients',
      to: '/ingredients',
      icon: 'i-material-symbols-cookie-outline-rounded'
    },
    {
      label: 'My Recipes List',
      to: '/recipes',
      icon: 'i-material-symbols-skillet-outline-rounded'
    }
  ],
  [
    {
      label: 'About',
      to: '/about',
      icon: 'i-heroicons-information-circle'
    },
    {
      label: 'How To',
      to: '/how-to',
      icon: 'i-heroicons-question-mark-circle'
    },
    // {
    //   label: 'Nom Nom recipe',
    //   to: `/recipe/${getSlug('Nom Nom Recipe')}`
    // },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      click: () => emit('openSettingsMenu')
    }
  ]
]
</script>

<template>
  <div class="ps-4 pe-3 h-14 flex justify-between items-center">
    <NuxtLink to="/">
      <span>logo</span>
    </NuxtLink>

    <UDropdown :items="links" :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-list-bullet-16-solid" class="-my-1" />
    </UDropdown>
  </div>
</template>
