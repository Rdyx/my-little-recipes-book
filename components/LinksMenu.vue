<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close', 'openSettingsMenu'])

const links = [
  {
    label: 'Home',
    to: '/'
  },
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

const close = () => {
  emit('close')
}
</script>

<template>
  <div>
    <SideMenu :is-open="props.isOpen" @close="close()">
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
            @click="close()"
          />
        </div>
      </div>

      <UVerticalNavigation class="mt-3" :links="links" @click="close()" />
    </SideMenu>
  </div>
</template>
