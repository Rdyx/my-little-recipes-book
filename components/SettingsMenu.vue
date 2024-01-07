<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <div class="ps-3 flex justify-between">
      <h1>Settings</h1>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1"
        @click="emit('close', false)"
      />
    </div>
  </div>
</template>
