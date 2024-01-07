<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <div>
    <SideMenu :is-open="props.isOpen" @close="close()">
      <div class="ps-3 flex justify-between">
        <h1>Settings</h1>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="close()"
        />
      </div>
    </SideMenu>
  </div>
</template>
