<script setup lang="ts">
// Stay aligned with rowsPerPage possibilities & USelectMenu options
const options = ['5', '10', '25', '50'] as ['5', '10', '25', '50']

type Props = {
  columns: {
    key: string
    label?: string
    sortable?: boolean
    class?: string
  }[]
  data: { [key: string]: string }[]
  rowsPerPage: (typeof options)[number]
  loading?: boolean
  isEditable?: boolean
  isDeletable?: boolean
  sort?: { column: string; direction: 'asc' | 'desc' }
}
const props = defineProps<Props>()
const emit = defineEmits(['edit', 'delete'])

const columns = [...props.columns]
if (props.isEditable || props.isDeletable)
  columns.push({ key: 'actions', class: 'flex justify-end me-3' })

const baseRowsPerPage = ref(props.rowsPerPage)
const rowsPerPageNumber = computed(() => parseInt(baseRowsPerPage.value, 10))
const totalResults = computed(() => props.data.length)

const currentPage = ref(1)
const precedentPage = computed(() => (currentPage.value - 1) * rowsPerPageNumber.value + 1)
const nextPage = computed(() =>
  Math.min(currentPage.value * rowsPerPageNumber.value, totalResults.value)
)

const shownRows = computed(() => {
  const data = [...props.data]

  if (rowsPerPageNumber.value > data.length) {
    currentPage.value = 1
  }

  return data.slice(
    (currentPage.value - 1) * rowsPerPageNumber.value,
    currentPage.value * rowsPerPageNumber.value
  )
})
</script>

<template>
  <UContainer class="flex flex-col flex-1">
    <UTable
      class="flex-1"
      :loading="props.loading || !props.data.length"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :sort="props.sort"
      :columns="columns"
      :rows="shownRows"
      :ui="{
        tbody: 'block divide-y divide-gray-200 dark:divide-gray-800 overflow-auto w-100',
        tr: {
          base: 'table w-full transition ease-linear duration-200 hover:bg-slate-800 hover:font-bold'
        },
        td: { base: 'max-w-[0] truncate' }
      }"
    >
      <template #actions-data="{ row }">
        <div class="justify-end flex">
          <UButton
            v-if="props.isEditable"
            class="me-3"
            icon="i-heroicons-pencil-square"
            color="primary"
            @click="emit('edit', row)"
          />

          <UButton
            v-if="props.isDeletable"
            icon="i-heroicons-trash"
            color="red"
            @click="emit('delete', row)"
          />
        </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <UContainer
      class="flex flex-wrap flex-0 justify-end md:justify-between items-center sticky bottom-0 z-10"
    >
      <UContainer>
        <span class="text-sm my-2">
          Showing
          <span class="font-medium">{{ precedentPage }}</span>
          to
          <span class="font-medium">{{ nextPage }}</span>
          of
          <span class="font-medium">{{ totalResults }}</span>
          results
        </span>
      </UContainer>

      <UContainer class="flex">
        <UContainer class="flex items-center me-3 mt-2 mb-3">
          <span class="text-sm me-2"> Rows per page: </span>
          <USelectMenu v-model="baseRowsPerPage" :options="options" />
        </UContainer>
        <UPagination v-model="currentPage" :page-count="rowsPerPageNumber" :total="totalResults" />
      </UContainer>
    </UContainer>
  </UContainer>
</template>
