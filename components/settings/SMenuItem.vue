<script setup lang="ts">
type Props = {
  title: string
  icon?: string
  class?: string
  slotWidth?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center my-2">
      <div class="flex items-center gap-2">
        <UIcon v-if="props.icon" :name="props.icon" />
        <span>{{ props.title }}</span>
      </div>
      <div :class="`${props.slotWidth ?? 'w-1/2'} flex justify-end`">
        <slot />
      </div>
    </div>
    <UDivider />
  </div>
</template>
