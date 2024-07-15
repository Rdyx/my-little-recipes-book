<script setup lang="ts">
type Props = { isOpen: boolean }
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const darkModeEnabled = ref(true)
const fontSize = ref(12)

const exportData = async () => {
  console.log('export')
  try {
    const blob = await db.export({ prettyJson: true })
    console.log(blob)
    // download(blob, "dexie-export.json", "application/json");
  } catch (error) {
    console.error('' + error)
  }
}
const importData = () => {
  console.log('import')
}
const saveSettings = () => {
  console.log('save')
  emit('close')
}
</script>

<template>
  <div>
    <CoreSideMenu :is-open="props.isOpen" title="Settings" @close="emit('close')">
      <SettingsMenuItem title="Dark Mode" icon="i-heroicons-moon">
        <UToggle
          :model-value="!darkModeEnabled"
          off-icon="i-heroicons-moon-solid"
          on-icon="i-heroicons-sun-solid"
          @click="darkModeEnabled = !darkModeEnabled"
        />
      </SettingsMenuItem>

      <SettingsMenuItem
        :title="`Font Size (${fontSize}px)`"
        icon="i-material-symbols-format-size-rounded"
      >
        <URange v-model="fontSize" :min="8" :max="20" size="2xs" />
      </SettingsMenuItem>

      <SettingsMenuItem
        title="Data"
        icon="i-material-symbols-home-storage-outline-rounded"
        slot-width="w-full"
      >
        <div class="flex flex-row gap-2">
          <UButton
            icon="i-material-symbols-upload-rounded"
            color="white"
            label="Export"
            @click="exportData()"
          />
          <UButton
            icon="i-material-symbols-download-rounded"
            color="white"
            label="Import"
            @click="importData()"
          />
        </div>
      </SettingsMenuItem>

      <template #footer>
        <div class="flex justify-end gap-6">
          <UButton color="gray" @click="emit('close')">Cancel</UButton>
          <UButton @click="saveSettings()">Save</UButton>
        </div>
      </template>
    </CoreSideMenu>
  </div>
</template>
