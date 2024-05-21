<template>
    <b-container class="is-half">
      <div class="sections">
        <div class="columns is-centered is-mobile">
          <div class="column is-half mt-3">
            <h1 class="has-text-centered m-2 is-size-4">Napisz do nas</h1>
                <form @submit.prevent="sendMessage">
                    <b-field label="E-Mail" label-position="inside">
                        <b-input type="email" v-model="email" validation-message="Wpisz prawidłowy adres email"></b-input>
                    </b-field>
                    <b-field label="Wiadomość" label-position="inside">
                        <b-input type="textarea" maxlength="200" v-model="message"></b-input>
                    </b-field>
                    <b-field>
                        <b-button native-type="submit">Wyślij</b-button>
                    </b-field>
                    <p :class="error ? 'has-text-danger' : 'has-text-success'">{{ info }}</p>
                </form>
                <div class="is-centered has-text-centered">
                    <h2 class="title">FAQ</h2>
                    <p class="subtitle">
                        <a href="https://github.com/majorek31/cinema-world">Kod strony</a>
                    </p>
                    <p class="subtitle">
                        <a href="/schema.png">Schemat bazy danych</a>
                    </p>
                </div>
          </div>
        </div>
      </div>
    </b-container>
</template>  
<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
const email = ref('');
const error = ref(false);
const info = ref('');
const message = ref('');
async function sendMessage() {
    try {
        const response = await axios.post('/api/message', {
            email: email.value,
            content: message.value
        });
        error.value = false;
        info.value = "Wysłano twoją wiadomość!";
    } catch (_) {
        error.value = true;
        info.value = "Nie udało się wysłać twojej wiadomości";        
    }
}
</script>