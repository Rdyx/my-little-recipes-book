<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <p>{{ getSlug('') }}</p>
    <NuxtLink to="/ingredients">Ingredients</NuxtLink>
    <NuxtLink to="/recipes">Recipes</NuxtLink>
    <NuxtLink :to="{ path: `/recipe/${getSlug('Nom Nom Recipe')}` }">Recipes</NuxtLink>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank"
      >Learn more about Nuxt Routing</a
    >
  </div>
</template>
