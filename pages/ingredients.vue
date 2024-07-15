<script setup lang="ts">
const loading = ref(false)

// Search & add ingredients
const searchInputPlaceholder = 'Search an ingredient...'
const showSearchInput = ref(true)
const searchInputValue = ref('')

const addInputPlaceholder = 'Add an ingredient...'
const showAddInput = ref(false)
const addInputValue = ref('')
const canAddIngredient = computed(() => {
  return !(
    !addInputValue.value ||
    allIngredientsList?.value?.some((ingredient) => ingredient.name === addInputValue.value.trim())
  )
})

const allIngredientsList = queryTableData(db.ingredients)
let ingredientsList = ref<Ref<Ingredients[] | undefined>>()

const filterIngredients = (value: string = '') => {
  loading.value = true

  if (value === '') {
    ingredientsList.value = undefined
  } else {
    ingredientsList.value = useObservable(
      from(liveQuery(() => db.ingredients.where('name').startsWith(value).toArray()))
    )
  }

  loading.value = false
}

const selectedIngredientName = ref('')
// Edition
const showIngredientEditModal = ref(false)
const newSelectedIngredientName = ref('')

const editIngredient = () => {
  // Delete and re-create to keep sorting automatically
  db.ingredients.delete(selectedIngredientName.value)
  db.ingredients.add({ name: newSelectedIngredientName.value })
  showIngredientEditModal.value = false
}

// Deletion
const showIngredientDeleteModal = ref(false)

const deleteIngredient = () => {
  db.ingredients.delete(selectedIngredientName.value)
  showIngredientDeleteModal.value = false
}
// Table
const columns = [{ key: 'name', label: 'Ingredient name' }]
</script>

<template>
  <UContainer v-auto-animate>
    <!-- Edition -->
    <CoreCModal
      v-if="showIngredientEditModal"
      title="Edit ingredient"
      @close="showIngredientEditModal = false"
      @confirm="editIngredient()"
    >
      <UInput class="w-full" v-model="newSelectedIngredientName" />
    </CoreCModal>

    <!-- Deletion -->
    <CoreCModal
      v-if="showIngredientDeleteModal"
      title="Are you sure?"
      @close="showIngredientDeleteModal = false"
      @confirm="deleteIngredient()"
    >
      Do you really want to delete <b>{{ selectedIngredientName }}</b> ?
    </CoreCModal>

    <UContainer
      class="flex flex-wrap py-2 justify-between items-center w-full sticky top-0 border-b-current z-10"
    >
      <span class="text-3xl">Ingredients</span>
      <UContainer class="ml-auto">
        <UButton
          icon="i-heroicons-magnifying-glass-20-solid"
          :color="showSearchInput ? 'primary' : searchInputValue ? 'sky' : 'white'"
          @click="
            () => {
              showSearchInput = !showSearchInput
              showAddInput = false
              addInputValue = ''
            }
          "
        />
        <UButton
          class="ms-2 md:mx-2"
          icon="i-heroicons-plus-20-solid"
          :color="showAddInput ? 'primary' : 'white'"
          @click="
            () => {
              showAddInput = !showAddInput
              addInputValue = ''
              showSearchInput = false
            }
          "
        />
      </UContainer>

      <!-- Search Input -->
      <UButtonGroup v-if="showSearchInput" class="w-full md:w-auto my-2 md:m-0">
        <USelectMenu
          searchable
          trailing
          class="w-full"
          v-model="searchInputValue"
          :placeholder="searchInputPlaceholder"
          :searchable-placeholder="searchInputPlaceholder"
          :options="allIngredientsList?.map((ingredient: Ingredients) => ingredient.name) ?? []"
          @update:model-value="filterIngredients(searchInputValue)"
        />
        <UButton
          icon="i-heroicons-x-mark"
          color="red"
          variant="solid"
          :disabled="!searchInputValue"
          @click="filterIngredients()"
        />
      </UButtonGroup>

      <!-- Add Input -->
      <UButtonGroup v-if="showAddInput" class="w-full md:w-auto my-2 md:m-0">
        <UInput class="w-full" :placeholder="addInputPlaceholder" v-model="addInputValue" />
        <UButton
          label="Add Ingredient"
          :color="!canAddIngredient ? 'white' : 'primary'"
          :disabled="!canAddIngredient"
          @click="
            () => {
              // Trim to prevent user to populate db with wrong/corrupted data
              // Also used to avoid duplicates
              db.ingredients.add({ name: addInputValue.trim() })
            }
          "
        />
      </UButtonGroup>
    </UContainer>

    <CoreCTable
      is-editable
      is-deletable
      rowsPerPage="10"
      :loading="loading"
      :columns="columns"
      :data="ingredientsList?.value ?? allIngredientsList ?? []"
      @edit="
        (row: Ingredients) => {
          showIngredientEditModal = true
          selectedIngredientName = row.name
          newSelectedIngredientName = row.name
        }
      "
      @delete="
        (row: Ingredients) => {
          showIngredientDeleteModal = true
          selectedIngredientName = row.name
        }
      "
    />
  </UContainer>
</template>
