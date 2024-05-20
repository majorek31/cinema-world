<template>
  <div>
    <div class="columns is-desktop is-centered is-vcentered mt-6 has-text-centered">
      <div class="column is-narrow">
        <div class="box">
            <p class="subtitle is-5">Witaj, {{ user.username }}</p>
        </div>
    </div>
    <div class="column is-narrow">
        <div class="box">
            <p class="subtitle is-5">Twój adres e-mail: {{ user.email }}</p>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="box">
          <p class="subtitle is-5">Twoja rola: {{ user.role == 'USER' ? "użytkownik" : "administrator" }}</p>
        </div>
      </div>
    </div>
    <div class="columns is-desktop is-centered is-vcentered mt-3 has-text-centered">
      <div class="column is-narrow">
        <div class="box">
          <p class="subtitle is-5">
            Data rejestracji: {{ new Date(user.registration_date).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/server/src/types';
import { useUserStore } from '@/stores/user.store';
import { ref } from 'vue';

async function fetchUserData() {
  const userData = await userStore.getUserInfo();
  return userData.data as User;
}
const userStore = useUserStore();
const user = ref(await fetchUserData());
</script>
<!-- 
<script lang="ts">
import type { User } from '@/server/src/types'
import { useUserStore } from '@/stores/user.store'
import { mapStores } from 'pinia'
export default {
  data() {
    return {
      user: {} as User
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  async created() {
    const response = await this.userStore.getUserInfo()
    if (response.error) return this.$buefy.dialog.alert('Błąd API, prosimy czekać!')
    this.user = response.data
  }
}
</script> -->
