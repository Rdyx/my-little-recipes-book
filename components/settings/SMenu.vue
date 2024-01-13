<script setup lang="ts">
type Props = { isOpen: boolean }
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const darkModeEnabled = ref(true)
const fontSize = ref(12)

const saveSettings = () => {
  console.log('save')
  emit('close')
}
</script>

<template>
  <div>
    <CoreSideMenu :is-open="props.isOpen" title="Settings" @close="emit('close')">
      <SettingsSMenuItem title="Dark Mode" icon="i-heroicons-moon">
        <UToggle
          :model-value="!darkModeEnabled"
          off-icon="i-heroicons-moon-solid"
          on-icon="i-heroicons-sun-solid"
          @click="darkModeEnabled = !darkModeEnabled"
        />
      </SettingsSMenuItem>

      <SettingsSMenuItem
        :title="`Font Size (${fontSize}px)`"
        icon="i-material-symbols-format-size-rounded"
      >
        <URange v-model="fontSize" :min="8" :max="20" size="2xs" />
      </SettingsSMenuItem>

      <div class="my-2 flex flex-row justify-between">
        <UButton icon="i-heroicons-pencil-square" color="gray" class="w-1/2" label="test" gap="xl">
        </UButton>
        <UButton icon="i-heroicons-pencil-square">Import Data</UButton>
      </div>

      <template #footer>
        <div class="flex justify-end gap-6">
          <UButton color="gray" @click="emit('close')">Cancel</UButton>
          <UButton @click="saveSettings()">Save</UButton>
        </div>
      </template>
    </CoreSideMenu>
  </div>
</template>
