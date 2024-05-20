<template>
    <div class="container is-half">
        <div class="sections">
            <div class="columns is-centered is-mobile">
                <div class="column is-half mt-3">
                    <h1 class="has-text-centered m-2 is-size-4">Dodaj nowy film</h1>
                    <!-- {{ movie }} -->
                    <form class="form" @submit.prevent="createMovie">
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
                            <button class="button is-primary" native-type="submit">
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
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import type { Movie } from '@prisma/client';
const router = useRouter();
const authStore = useAuthStore();
const movie = {} as Movie;
async function createMovie() {
    const response = (await axios.post("/api/movie", {
        movie
    }, {
        headers: {
            Authorization: 'Bearer ' + authStore.token
        }
    })).data;
    router.push(`/movie/${response.id}`);
}
</script>