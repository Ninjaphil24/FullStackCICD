import { defineStore, acceptHMRUpdate } from 'pinia';
import { api, baseURL } from 'src/boot/axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    registrationForm: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    loginForm: {
      email: '',
      password: '',
    },
  }),
  getters: {},
  actions: {
    async register() {
      await baseURL.get('/sanctum/csrf-cookie');
      const result = await api.post('/register', this.registrationForm);
      console.log('Registration results: ', result.data);
    },
    async login() {
      console.log('Login form: ', this.loginForm);
      await baseURL.get('/sanctum/csrf-cookie');
      const result = await api.post('/login', this.loginForm);
      console.log('Login results: ', result.data);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
