<script setup lang="ts">
const loading = ref(false)

const allIngredientsList = queryTableData(db.ingredients)
const ingredientsList = ref<Ref<Ingredients[] | undefined>>()

// Search ingredients input
const showSearchIngredientsInput = ref(false)
const searchInputPlaceholder = 'Search an ingredient...'
const searchInputValue = ref('')

const toggleShowSearchIngredientInput = () => {
  showSearchIngredientsInput.value = !showSearchIngredientsInput.value
  showAddIngredientInput.value = false
  addInputValue.value = ''
}

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

// Add ingredient input
const showAddIngredientInput = ref(false)
const addInputPlaceholder = 'Add an ingredient...'
const addInputValue = ref('')
const canAddIngredient = ref(false)

const toggleShowAddIngredientInput = () => {
  showAddIngredientInput.value = !showAddIngredientInput.value
  addInputValue.value = ''
  showSearchIngredientsInput.value = false
}
const addIngredientToDb = () => {
  // Trim to prevent user to populate db with wrong/corrupted data
  // Also used to avoid duplicates
  db.ingredients.add({ name: addInputValue.value.trim() })
  addInputValue.value = ''
  canAddIngredient.value = false
}

const checkCanAddIngregient = (ingredientName: string) => {
  return (
    ingredientName.trim().length > 0 &&
    !allIngredientsList?.value?.some((ingredient) => ingredient.name === ingredientName.trim())
  )
}

// Table modals
const selectedIngredientName = ref('')
// Edition
const showIngredientEditModal = ref(false)
const newSelectedIngredientName = ref('')
const canEditIngredient = ref(false)

const showEditIngredientModal = (tableRow: Ingredients) => {
  selectedIngredientName.value = tableRow.name
  newSelectedIngredientName.value = tableRow.name
  showIngredientEditModal.value = true
  canEditIngredient.value = false
}

const editIngredient = () => {
  // Delete and re-create to keep sorting automatically
  db.ingredients.delete(selectedIngredientName.value)
  db.ingredients.add({ name: newSelectedIngredientName.value })
  showIngredientEditModal.value = false
}

// Deletion
const showIngredientDeleteModal = ref(false)

const showDeleteIngredientModal = (tableRow: Ingredients) => {
  showIngredientDeleteModal.value = true
  selectedIngredientName.value = tableRow.name
}

const deleteIngredient = () => {
  db.ingredients.delete(selectedIngredientName.value)
  showIngredientDeleteModal.value = false
}

// Table
const columns = [{ key: 'name', label: 'Ingredient' }]
</script>

<template>
  <UContainer>
    <!-- Edition -->
    <CoreCModal
      v-if="showIngredientEditModal"
      title="Edit ingredient"
      :disabled-confirm="!canEditIngredient"
      @close="showIngredientEditModal = false"
      @confirm="editIngredient()"
    >
      <UInput
        class="w-full"
        v-model="newSelectedIngredientName"
        @update:model-value="
          (value) =>
            (canEditIngredient =
              checkCanAddIngregient(value) || checkCanAddIngregient(newSelectedIngredientName))
        "
      />
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
      class="flex flex-wrap pb-2 justify-between items-center w-full sticky top-0 border-b-current z-10"
    >
      <span class="text-3xl">Ingredients</span>
      <UContainer class="ml-auto">
        <UButton
          icon="i-heroicons-magnifying-glass-20-solid"
          :color="showSearchIngredientsInput ? 'primary' : searchInputValue ? 'sky' : 'white'"
          @click="() => toggleShowSearchIngredientInput()"
        />
        <UButton
          class="ms-2"
          icon="i-heroicons-plus-20-solid"
          :color="showAddIngredientInput ? 'primary' : 'white'"
          @click="() => toggleShowAddIngredientInput()"
        />
      </UContainer>

      <!-- Search Input -->
      <UContainer class="w-full">
        <UButtonGroup v-if="showSearchIngredientsInput" class="w-full mt-3">
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
            @click="filterIngredients(), (searchInputValue = '')"
          />
        </UButtonGroup>

        <!-- Add Input -->
        <UButtonGroup v-if="showAddIngredientInput" class="w-full mt-3">
          <UInput
            class="w-full"
            :placeholder="addInputPlaceholder"
            v-model="addInputValue"
            @update:model-value="(value) => (canAddIngredient = checkCanAddIngregient(value))"
          />
          <UButton
            label="Add Ingredient"
            color="primary"
            :disabled="!canAddIngredient"
            @click="() => addIngredientToDb()"
          />
        </UButtonGroup>
      </UContainer>
    </UContainer>

    <CoreCTable
      is-editable
      is-deletable
      rowsPerPage="10"
      :loading="loading"
      :columns="columns"
      :data="ingredientsList?.value ?? allIngredientsList ?? []"
      @edit="(tableRow: Ingredients) => showEditIngredientModal(tableRow)"
      @delete="(tableRow: Ingredients) => showDeleteIngredientModal(tableRow)"
      :ui="{
        tbody:
          'flex flex-col items-center divide-y divide-gray-200 dark:divide-gray-800 overflow-auto w-100'
      }"
    />
  </UContainer>
</template>
