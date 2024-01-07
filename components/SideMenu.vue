<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
  isSettingsMenuOpen: Boolean
})
const emit = defineEmits(['openSettingsMenu', 'close'])

function closeSideMenu() {
  if (props.isSettingsMenuOpen) return
  emit('close', false)
}
</script>

<template>
  <div>
    <USlideover
      :model-value="props.isOpen"
      @open-settings-menu="emit('openSettingsMenu', true)"
      @close="closeSideMenu()"
    >
      <div class="p-4">
        <slot></slot>
      </div>
    </USlideover>
  </div>
</template>
