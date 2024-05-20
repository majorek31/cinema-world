<template>
    <div class="container is-half">
        <div class="sections">
            <div class="columns is-centered is-mobile">
                <div class="column is-half mt-6 has-text-centered">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                            <img
                                :src="movie.mugshotUrl"
                                alt="Placeholder image"
                            />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">{{ movie.title }}</p>
                                </div>
                            </div>
                            <div class="content">
                                {{movie.description}}
                                <b-rate
                                    v-model="movie.rating"
                                    show-score
                                    disabled
                                ></b-rate>
                            </div>
                            <div class="buttons">
                                <button class="button" @click="$router.back">
                                    Powrót
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie.store';
import { useRouter } from 'vue-router';
const movieStore = useMovieStore();
const router = useRouter();
const movieId = parseInt(router.currentRoute.value.params.id as string);
const movie = (await movieStore.getMovieById(movieId)).data;
</script>