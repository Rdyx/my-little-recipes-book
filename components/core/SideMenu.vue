<script setup lang="ts">
type Props = {
  isOpen: boolean
  title: string
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <USlideover :model-value="props.isOpen" @close="emit('close')">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ props.title }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="emit('close')"
            />
          </div>
        </template>

        <slot class="h-32" />

        <template #footer>
          <slot name="footer" />
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
