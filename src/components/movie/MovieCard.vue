<template>
    <div class="card mb-4">
        <div class="card-image">
            <figure class="image is-2by3">
                <img :src="movie.mugshotUrl" :alt="movie.title">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <div class="title-container">
                        <RouterLink :to="'/movie/' + movie.id">{{ movie.title }}</RouterLink>
                    </div>
                    <p class="subtitle is-6 ">{{ movie.releaseDate }}</p>
                </div>
            </div>
            <div class="content">
                <b-rate
                    v-model="movie.rating"
                    show-score
                    disabled
                ></b-rate>
                <div class="buttons">
                    <!-- <div class="button" v-if="user && user.role == 'ADMIN'">Edytuj</div> -->
                    <div class="button is-primary" @click="authStore.isLoggedIn ? undefined : $router.push('/login')">Kup bilet</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import type { User } from '@/server/src/types';
import type { BDialogConfig } from 'buefy/src/types/components';
const props = defineProps(['movie']);
const authStore = useAuthStore();
const userStore = useUserStore();
let user = userStore.user as User | null;
const dialogData = {
    onConfirm(value, dialog) {
        console.log(value);
    },
    message: "Bój się mnie",
    canCancel: true,
    type: 'is-danger'
} as BDialogConfig
</script>

<style scoped>
.card {
    flex: 1 1 calc(25.5% - 40px);
    max-width: 15vw;
    margin: 5px;
}
@media (max-width: 1100px) {
    .card {
        max-width: 80vw;
        flex: 1 1 calc(33.3% - 40px);
    }
}
@media (max-width: 720px) {
    .card {
        max-width: 80vw;
        flex: 1 1 100%;
    }
}
.title-container {
    height: 3em;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.title-container a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.media-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>