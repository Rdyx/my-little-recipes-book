<script setup lang="ts">
const { $pwa } = useNuxtApp()

const toast = useToast()
const show = ref($pwa?.needRefresh)

onMounted(() => {
  if ($pwa?.offlineReady) toast.add({ title: 'App ready to work offline' })
})
</script>

<template>
  <div>
    <UModal v-model="show" :ui="{ width: 'w-full sm:max-w-xs' }" prevent-close>
      <UContainer class="h-32 p-4 flex flex-col justify-evenly items-center">
        <span>New update available.</span>
        <UButton label="Reload" class="my-2" @click="$pwa?.updateServiceWorker()" />
      </UContainer>
    </UModal>
  </div>
</template>
