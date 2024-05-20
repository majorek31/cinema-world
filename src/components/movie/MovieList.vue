<template>
    <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <!-- <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/>
        <movie-card v-for="(movie) in movies" :key="movie.id" :movie="movie"/> -->
    </div>
</template>

<script setup lang="ts">
import MovieCard from "@/components/movie/MovieCard.vue";
import { useMovieStore } from "@/stores/movie.store";
const movieStore = useMovieStore();
const movies = (await movieStore.getAllMovies()).data.movies;
console.log(movies)
</script>
