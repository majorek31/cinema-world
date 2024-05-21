<template>
    <div class="container is-half">
        <div class="sections">
            <div class="columns is-centered is-mobile">
                <div class="column is-half mt-3">
                    <h1 class="has-text-centered m-2 is-size-4">Kupujesz bilet na: <p><b>{{ movie.title }}</b></p></h1>
                    <form class="form" @submit.prevent="confirmBuy">
                        <b-field label="Twoj email" label-position="inside">
                            <b-input type="email" v-model="user.email" disabled></b-input>
                        </b-field>
                        <b-field label="Data i godzina" label-position="inside">
                            <b-datetimepicker
                                v-model="selected"
                                placeholder="Kliknij aby wybrać">
                            </b-datetimepicker>
                        </b-field>
                        <div class="buttons">
                            <button class="button is-primary">
                                Zakup bilet
                            </button>
                        </div>
                    </form>
                    <b-loading></b-loading>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const userStore = useUserStore();
const user = userStore.user;
const route = useRoute();
const movie = (await axios.get(`/api/movie/${route.params.id}`)).data;
const selected = ref(new Date());
const router = useRouter();
async function confirmBuy() {
    const isoDate = selected.value.toISOString();
    const response = await axios.post('/api/ticket/', {
        date: isoDate,
        movieId: parseInt(<string>route.params.id)
    }, {
        headers: {
            Authorization: 'Bearer: ' + authStore.token
        }
    });
    router.push('/account');
}
</script>
