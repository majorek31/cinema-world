<template>
  <div class="container mt-6" v-if="isLoaded">
    <p class="title">Panel konta</p>
    <b-tabs v-model="currentTab">
      <b-tab-item label="Moje konto">
        <section class="hero">
          <Suspense>
            <AccountInfo />
          </Suspense>
        </section>
      </b-tab-item>
      <b-tab-item label="Wiadomości" :visible="user.role === 'ADMIN'">
        <h1 class="title">Lista wiadomości</h1>
        <Suspense>
          <MesssageList/>
        </Suspense>
      </b-tab-item>
      <b-tab-item label="Filmy" :visible="user.role === 'ADMIN'">
        <button class="button" @click="$router.push('/movie/create')">Dodaj film</button>
        <Suspense>
          <MovieTable/>
        </Suspense>
      </b-tab-item>
      <b-tab-item label="Bilety">

      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script setup lang="ts">
import AccountInfo from '@/components/account/AccountInfo.vue';
import MesssageList from '@/components/account/MesssageList.vue';
import MovieTable from '@/components/account/admin/MovieTable.vue';
import { useUserStore } from '@/stores/user.store';
import type { User } from '@/server/src/types';
import { reactive, ref } from 'vue';
const currentTab = ref(0);
const userStore = useUserStore();
const isLoaded = ref(false);
let user = reactive({} as User);
userStore.getUserInfo().finally(() => {
  user = (userStore.user as unknown) as User;
  isLoaded.value = true;
})
</script>
