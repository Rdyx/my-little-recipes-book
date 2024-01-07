<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <USlideover :model-value="props.isOpen" @close="emit('close')">
      <div class="p-4">
        <slot name="header" />
        <slot />
      </div>
    </USlideover>
  </div>
</template>
