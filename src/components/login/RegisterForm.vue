<template>
  <section>
    <form @submit.prevent="register">
      <b-field label="E-Mail" label-position="inside">
        <b-input type="email" v-model="email" required message="test"></b-input>
      </b-field>
      <b-field label="Hasło" label-position="inside">
        <b-input type="password" password-reveal v-model="password" required></b-input>
      </b-field>
      <b-field label="Powtórz hasło" label-position="inside">
        <b-input type="password" password-reveal v-model="confirmPassword" required></b-input>
      </b-field>
      <b-field>
        <b-button native-type="submit">Zarejestruj się</b-button>
      </b-field>
      <RouterLink to="/login">Mam już konto</RouterLink>
    </form>
  </section>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useAuthStore)
  },
  data() {
    return {
      email: '',
      emailError: false,
      password: '',
      confirmPassword: '',
      passwordError: false,
      passwordErrorMsg: ''
    }
  },
  methods: {
    async register() {
      // if (this.passwordError || this.emailError)
      //     return this.$buefy.toast.open({
      //         type: 'is-danger',
      //         message: 'Wypełnij poprawnie formularz'
      //     })
      const loading = this.$buefy.loading.open({
        canCancel: false
      })
      const response = await this.authStore.register({
        email: this.email,
        password: this.password
      })
      this.$buefy.toast.open({
        type: !response.error ? 'is-success' : 'is-danger',
        message: response.data
      })
      loading.close()
    },
    checkPassword() {
      if (this.password != this.confirmPassword) {
        this.passwordErrorMsg = 'Hasła nie są takie same'
        this.passwordError = true
        return
      }
      this.passwordError = false
    }
  }
}
</script>
