<template>
  <b-navbar class="has-shadow">
    <template #brand>
      <b-navbar-item tag="h1"> Cinema World </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="RouterLink" to="/">Główna</b-navbar-item>
      <b-navbar-item tag="RouterLink" to="/contact">Kontakt</b-navbar-item>
      <!-- <b-navbar-item tag="RouterLink" to="/about">Repertuar</b-navbar-item> -->
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <template v-if="isLoaded">
            <RouterLink to="/login" class="button is-primary" v-if="!authStore.isLoggedIn">
              <strong>Zaloguj się</strong>
            </RouterLink>
            <b-dropdown
              icon-right="user"
              position="is-bottom-left"
              @click.prevent="updateUser"
              v-else
            >
              <template #trigger="{ active }">
                <b-button type="is-text" icon-right="user" />
              </template>
              <b-dropdown-item aria-role="listitem" class="has-icon-right">
                <b>Witaj, {{ user.username }}</b>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" class="has-icon-right" tag="RouterLink" to="account">
                <RouterLink class="has-text-black" to="/account">Moje konto</RouterLink>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" tag="a" class="has-icon-right" @click="authStore.logout">
                <a class="has-text-black" >Wyloguj się</a>
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <b-skeleton width="64px" :active="!isLoaded"></b-skeleton>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { useUserStore } from '@/stores/user.store'
import { mapStores } from 'pinia'
import { RouterLink } from 'vue-router'
import type { User } from '@/server/src/types'
export default {
  data() {
    return {
      isLoaded: false,
      user: {} as User
    }
  },
  computed: {
    ...mapStores(useAuthStore, useUserStore)
  },
  methods: {
    async updateUser() {
      if (!this.authStore.isLoggedIn) return
      const response = await this.userStore.getUserInfo()
      if (response.error && this.authStore.isLoggedIn) {
        this.isLoaded = true
        return this.$buefy.notification.open(response.data)
      }
      this.user = response.data
    }
  },
  async created() {
    if (!this.authStore.isLoggedIn) return (this.isLoaded = true)
    await this.updateUser()
    this.isLoaded = true
  }
}
</script>
