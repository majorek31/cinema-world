import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";
import axios from "axios";
import type { User } from "@/server/src/types";

const BASE_URL = window.location.origin;
export const useUserStore = defineStore('user', {
    actions: {
        async getUserInfo(): Promise<ApiResponse> {
            const authStore = useAuthStore();
            try {
                const user = await axios.get(BASE_URL + "/api/user/", {
                    headers: {
                        Authorization: "Bearer " + authStore.token
                    }
                });
                return { error: false, data: user.data };
            } catch (error) {
                return { error: true, data: 'Wystąpił błąd pobierania danych'}
            }
        }
    }
})