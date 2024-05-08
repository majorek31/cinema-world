<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { mapStores } from 'pinia'
export default {
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    ask() {
      useAuthStore().login({
        email: 'majorek@gmail.com',
        password: 'majorek'
      })
      // this.$buefy.dialog.confirm({
      //     message: 'Czy chcesz umrzeć?',
      //     cancelText: "Nie",
      //     confirmText: "Tak",
      //     onConfirm: () => this.randomusersStore.getRandomUser()
      // });
    }
  }
}
</script>

<template>
  <div>
    {{ authStore }}
  </div>
  <b-button @click="ask" label="Nowy user" />
</template>
