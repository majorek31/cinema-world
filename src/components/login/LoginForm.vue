<template>
    <section>
        <form @submit.prevent="login">
            <b-field label="E-Mail" label-position="inside">
                <b-input type="email" v-model="email" required message="test"></b-input>
            </b-field>
            <b-field label="Hasło" label-position="inside">
                <b-input type="password" password-reveal v-model="password" required></b-input>
            </b-field>
            <b-field>
                <b-button native-type="submit">Zaloguj się</b-button>
            </b-field>
            <RouterLink to="/register">Utwórz konto</RouterLink>
        </form>
    </section>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useAuthStore)
    },
    data() {
        return {
            email: '',
            emailError: false,
            password: '',
        }
    },
    methods: {
        async login() {
            console.log("hello")
            const loading = this.$buefy.loading.open({
                canCancel: false
            });
            const response = await this.authStore.login({
                email: this.email,
                password: this.password
            });
            this.$buefy.toast.open({
                type: !response.error ? 'is-success' : 'is-danger',
                message: response.data
            });
            loading.close();
            if (!response.error)
                this.$router.push("/")
        }
    }
}
</script>