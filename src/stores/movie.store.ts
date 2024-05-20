import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = window.location.origin
export const useMovieStore = defineStore('movie', {
  actions: {
    async getAllMovies(): Promise<ApiResponse> {
        try {
            const response = (await axios.get('/api/movie')).data;
            return {data: response, error: false};
        } catch (error) {
            return {data: null, error: true};
        }
      },
      async getMovieById(id: number): Promise<ApiResponse> {
        try {
            const response = (await axios.get('/api/movie/' + id)).data;
            return {data: response, error: false};
        } catch (error) {
            return {data: null, error: true};
        }
    }    
  }
})
