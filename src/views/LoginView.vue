<template>
    <b-container class="is-half">
        <div class="sections">
            <div class="columns is-centered is-mobile">
                <div class="column is-half mt-3">
                    <h1 class="has-text-centered m-2 is-size-4">Logowanie</h1>
                    <LoginForm/>
                </div>
            </div>
        </div>
    </b-container>
</template>

<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue';
</script>