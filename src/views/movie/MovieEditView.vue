<template>
    <div class="container is-half">
        <div class="sections">
            <div class="columns is-centered is-mobile">
                <div class="column is-half mt-3">
                    <h1 class="has-text-centered m-2 is-size-4">Edytowanie filmu</h1>
                    <!-- {{ movie }} -->
                    <form class="form">
                        <b-field label="Tytuł" label-position="inside">
                            <b-input type="text" v-model="movie.title"></b-input>
                        </b-field>
                        <b-field label="Opis" label-position="inside">
                            <b-input type="textarea" v-model="movie.description"></b-input>
                        </b-field>
                        <b-field label="Gatunek" label-position="inside">
                            <b-input type="text" v-model="movie.genre"></b-input>
                        </b-field>
                        <b-field label="Rok produkcji" label-position="inside">
                            <b-input type="number" v-model="movie.releaseDate"></b-input>
                        </b-field>
                        <b-field label="Link do zdjęcia" label-position="inside">
                            <b-input type="text" v-model="movie.mugshotUrl"></b-input>
                        </b-field>
                        <b-rate v-model="movie.rating" custom-text="Ocena">
                        </b-rate> 
                        <div class="buttons">
                            <button class="button is-primary" @click="$buefy.dialog.confirm(dialogConfig)">
                                Zapisz
                            </button>
                        </div>                       
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie.store';
import { useRouter } from 'vue-router';
import type { BDialogConfig } from 'buefy/src/types/components';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
const router = useRouter();
const authStore = useAuthStore();
const dialogConfig = {
    message: "Czy napewno chcesz zmienić ten wpis?",
    confirmText: "Tak",
    cancelText: "Nie",
    async onConfirm(value, dialog) {
        await axios.put("/api/movie", {
            movie
        }, {
            headers: {
                Authorization: 'Bearer ' + authStore.token
            }
        });
        router.push(`/movie/${movie.id}`);
    },
} as BDialogConfig
const movieStore = useMovieStore();
const movieId = parseInt(router.currentRoute.value.params.id as string);
const movie = (await movieStore.getMovieById(movieId)).data;
</script>