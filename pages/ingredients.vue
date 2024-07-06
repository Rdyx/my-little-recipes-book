<script setup lang="ts">
const showSearchInput = ref(false)
const searchInputValue = ref('')

const showAddInput = ref(false)
const addInputValue = ref('')

const allIngredientsList = queryTableData(db.ingredients)
let ingredientsList = allIngredientsList

const placeholder = 'Search an ingredient...'

const filter = async (value: string = '') => {
  if (searchInputValue.value === 'All') {
    searchInputValue.value = ''
    ingredientsList = allIngredientsList
  } else {
    ingredientsList = useObservable(
      from(liveQuery(() => db.ingredients.where('name').startsWith(value).toArray()))
    )
  }
}

// const showSearchInput = (show: boolean) => {}
</script>

<template>
  <div v-auto-animate>
    <div class="flex w-full justify-between mb-3">
      <span class="text-3xl">Ingredients</span>

      <div class="">
        <UButton
          icon="i-heroicons-magnifying-glass-20-solid"
          :color="showSearchInput ? 'green' : searchInputValue ? 'sky' : 'white'"
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
          :color="showAddInput ? 'green' : 'white'"
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
    <USelectMenu
      v-if="showSearchInput"
      class="mb-3"
      icon="i-heroicons-magnifying-glass-20-solid"
      searchable
      v-model="searchInputValue"
      :placeholder="placeholder"
      :searchable-placeholder="placeholder"
      :options="['All'].concat(allIngredientsList?.map((ingredient) => ingredient.name) ?? [])"
      @update:model-value="filter(searchInputValue)"
    />

    <!-- Add Input -->
    <UButtonGroup v-if="showAddInput" class="w-full mb-3" orientation="horizontal">
      <UInput class="w-full" v-model="addInputValue" />
      <UButton
        label="Add Ingredient"
        color="green"
        :disabled="!addInputValue"
        @click="db.ingredients.add({ name: addInputValue })"
      />
    </UButtonGroup>

    <!-- <button @click="db.ingredients.add({ name: `test2` })">Add item</button> -->

    <ul v-if="ingredientsList" v-auto-animate>
      <li v-for="ingredient in ingredientsList" :key="ingredient.name">{{ ingredient.name }}</li>
    </ul>

    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>
