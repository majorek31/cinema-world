import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = window.location.origin
export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: window.localStorage.getItem('token'),
      isLoggedIn: window.localStorage.getItem('token') != null ? true : false
    }
  },
  actions: {
    async login(credentials: LoginCredentials): Promise<ApiResponse> {
      try {
        const response = await axios.get(BASE_URL + '/api/auth/login', {
          params: {
            email: credentials.email,
            password: credentials.password
          }
        })
        this.token = response.data.token
        window.localStorage.setItem('token', response.data.token)
        this.isLoggedIn = true
        return { error: false, data: 'Zalogowano pomyślnie' }
      } catch (err: any) {
        if (err.response.status == 404)
          return { error: true, data: 'Nie znaleziono takiego użytkownika!' }
        return { error: true, data: 'Coś poszło nie tak!' }
      }
    },
    async register(credentials: RegisterCredentials): Promise<ApiResponse> {
      try {
        await axios.post(BASE_URL + '/api/auth/register', {
          email: credentials.email,
          password: credentials.password
        })
        return { error: false, data: 'Zarejestrowano!' }
      } catch (err: any) {
        if (err.response.status == 409) return { error: true, data: 'Podany email jest zajęty!' }
        return { error: true, data: 'Coś poszlo nie tak!' }
      }
    },
    logout() {
      this.token = null
      this.isLoggedIn = false
      window.localStorage.removeItem('token')
    }
  }
})
