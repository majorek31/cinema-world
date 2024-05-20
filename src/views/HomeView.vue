<template>
  <div class="container is-centered">
    <h1 class="has-text-centered mt-3 is-size-3">Cinema World - Nasze filmy</h1>
      <Suspense>
        <movie-list/>
      </Suspense>
  </div>
</template>

<script setup lang="ts">
import MovieList from "@/components/movie/MovieList.vue";
</script>
