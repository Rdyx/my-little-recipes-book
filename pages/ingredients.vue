<script setup lang="ts">
const showSearchInput = ref(false)
const searchInputValue = ref('')

const showAddInput = ref(false)
const addInputValue = ref('')

const allIngredientsList = queryTableData(db.ingredients)
let ingredientsList = allIngredientsList

const placeholder = 'Search an ingredient...'

const filterIngredients = async (value: string = '') => {
  searchInputValue.value = value

  if (value === '') {
    ingredientsList = allIngredientsList
  } else {
    ingredientsList = useObservable(
      from(liveQuery(() => db.ingredients.where('name').startsWith(value).toArray()))
    )
  }
}
</script>

<template>
  <div v-auto-animate>
    <div class="flex w-full justify-between mb-2">
      <span class="text-3xl">Ingredients</span>
      <div>
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
          class="ml-2"
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
      </div>
    </div>

    <!-- Search Input -->
    <UButtonGroup
      v-if="showSearchInput"
      class="w-full mb-2"
      orientation="horizontal"
      v-model="searchInputValue"
    >
      <USelectMenu
        class="w-full"
        searchable
        trailing
        v-model="searchInputValue"
        :placeholder="placeholder"
        :searchable-placeholder="placeholder"
        :options="allIngredientsList?.map((ingredient) => ingredient.name) ?? []"
        @update:model-value="filterIngredients(searchInputValue)"
      />
      <UButton
        icon="i-heroicons-x-mark"
        color="primary"
        variant="solid"
        v-model="searchInputValue"
        :disabled="!searchInputValue"
        @click="filterIngredients()"
      />
    </UButtonGroup>

    <!-- Add Input -->
    <UButtonGroup v-if="showAddInput" class="w-full mb-2" orientation="horizontal">
      <UInput class="w-full" v-model="addInputValue" />
      <UButton
        label="Add Ingredient"
        color="primary"
        :disabled="!addInputValue"
        @click="db.ingredients.add({ name: addInputValue })"
      />
    </UButtonGroup>

    <ul v-if="ingredientsList" v-auto-animate>
      <li v-for="ingredient in ingredientsList" :key="ingredient.name">{{ ingredient.name }}</li>
    </ul>

    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>
