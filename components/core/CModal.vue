<script setup lang="ts">
type Props = {
  title: string
  disabledConfirm?: boolean
  cancelText?: string
  confirmText?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabledConfirm: false,
  cancelText: 'Cancel',
  confirmText: 'Confirm'
})
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
              {{ props.cancelText }}
            </UButton>
            <UButton color="primary" :disabled="props.disabledConfirm" @click="emit('confirm')">
              {{ props.confirmText }}
            </UButton>
          </div>
        </slot>
      </template>
    </UCard>
  </UModal>
</template>
