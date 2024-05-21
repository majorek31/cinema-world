<template>
    <b-table :data="movies">
        <b-table-column field="id" label="ID" v-slot="props">
            {{ props.row.id }}
        </b-table-column>
        <b-table-column field="title" label="Tytuł" searchable v-slot="props">
            {{ props.row.title }}
        </b-table-column>
        <b-table-column field="genre" label="Gatunek" v-slot="props">
            {{ props.row.genre }}
        </b-table-column>
        <b-table-column label="Akcje" v-slot="props" width="10vw">
            <div class="buttons">
                <button class="button is-info" @click="$router.push(`/movie/${props.row.id}/edit`)">
                    Edytuj
                </button>
                <button class="button is-danger" @click="movieId = props.row.id; $buefy.dialog.confirm(dialogConfig);">
                    Usuń
                </button>
            </div>
        </b-table-column>
    </b-table>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useMovieStore } from '@/stores/movie.store';
import axios from 'axios';
import type { BDialogConfig } from 'buefy/src/types/components';
const movieStore = useMovieStore();
let movieId = 0;
const dialogConfig = {
    cancelText: "Anulij",
    confirmText: "Usuń",
    message: "Czy napewno chcesz usunąc ten film?",
    type: 'is-danger',
    async onConfirm(value, dialog) {
        await axios.delete("/api/movie/" + movieId, { 
            headers: {
                Authorization: 'Bearer: ' + useAuthStore().token
            }
        });
    },
} as BDialogConfig
const movies = (await movieStore.getAllMovies()).data.movies;

</script>