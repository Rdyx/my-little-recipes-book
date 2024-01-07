<script setup lang="ts">
const emit = defineEmits(['close', 'openSettingsMenu'])
const links = [
  {
    label: 'My Ingredients',
    to: '/ingredients'
  },
  {
    label: 'My Recipes List',
    to: '/recipes'
  },
  {
    label: 'Nom Nom recipe',
    to: `/recipe/${getSlug('Nom Nom Recipe')}`
  }
]
</script>

<template>
  <div>
    <div class="ps-3 flex justify-between">
      <h1>Menu</h1>
      <div class="space-x-2">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-cog-6-tooth-solid"
          class="-my-1"
          @click="emit('openSettingsMenu', true)"
        />
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="emit('close', false)"
        />
      </div>
    </div>

    <UVerticalNavigation class="mt-3" :links="links" @click="emit('close', false)" />
  </div>
</template>
