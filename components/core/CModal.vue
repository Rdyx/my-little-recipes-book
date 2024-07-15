<script setup lang="ts">
type Props = {
  title: string
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'confirm'])

const show = ref(true)
</script>

<template>
  <UModal v-model="show" @close="emit('close')">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <slot name="title">
          <span>{{ props.title }}</span>
        </slot>
      </template>

      <slot />

      <template #footer>
        <slot name="actions">
          <div class="w-full flex justify-end">
            <UButton color="primary" variant="outline" class="me-3" @click="emit('close')">
              Cancel
            </UButton>
            <UButton color="primary" @click="emit('confirm')">Confirm</UButton>
          </div>
        </slot>
      </template>
    </UCard>
  </UModal>
</template>
