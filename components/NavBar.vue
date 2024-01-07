<script setup lang="ts">
const emit = defineEmits(['openLinksMenu'])
</script>

<template>
  <div class="ps-4 pe-3 h-14 flex justify-between items-center">
    <nuxt-link to="/">
      <span>logo</span>
    </nuxt-link>

    <div class="">
      <!-- <UButton
        icon="i-heroicons-cog-6-tooth-solid"
        class="-my-1"
        @click="emit('openLinksMenu', true)"
      /> -->
      <UButton
        icon="i-heroicons-list-bullet-16-solid"
        class="-my-1"
        @click="emit('openLinksMenu', true)"
      />
    </div>
  </div>
</template>
