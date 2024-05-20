import { defineStore } from 'pinia'
import { useAuthStore } from './auth.store'
import axios from 'axios'

const BASE_URL = window.location.origin
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null
    };
  },
  actions: {
    async getUserInfo(): Promise<ApiResponse> {
      try {
      const authStore = useAuthStore();
        const user = await axios.get(BASE_URL + '/api/user/', {
          headers: {
            Authorization: 'Bearer ' + authStore.token
          }
        });
        this.user = user.data;
        return { error: false, data: user.data }
      } catch (error) {
        return { error: true, data: 'Wystąpił błąd pobierania danych' }
      }
    }
  }
})
