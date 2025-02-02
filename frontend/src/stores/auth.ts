import { defineStore, acceptHMRUpdate } from 'pinia';
import { api, baseURL } from 'src/boot/axios';

export interface User {
  name: string;
  email: string;
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as User | null,
    registrationForm: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    loginForm: {
      email: '',
      password: '',
    },
    loading: '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async initialize() {
      if (this.initialized) return; // Prevent multiple initializations
      this.loading = 'initialize';
      try {
        await this.fetchUser(); // Fetch the user on app load
        this.initialized = true;
      } catch (error) {
        console.error('Initialization error: ', error);
      } finally {
        this.loading = false;
      }
    },
    async register() {
      this.loading = 'registration';
      try {
        await baseURL.get('/sanctum/csrf-cookie');
        const result = await api.post('/register', this.registrationForm);
        console.log('Registration results: ', result.data);
        await this.fetchUser();
        this.loading = false;
      } catch (error) {
        console.error('Registration error: ', error);
        this.loading = false;
      }
    },
    async login() {
      this.loading = 'login';
      try {
        console.log('Login form: ', this.loginForm);
        await baseURL.get('/sanctum/csrf-cookie');
        const result = await api.post('/login', this.loginForm);
        console.log('Login results: ', result.data);
        await this.fetchUser();
        this.loading = false;
      } catch (error) {
        console.error('Login error: ', error);
        this.loading = false;
      }
    },
    async fetchUser() {
      try {
        const result = await api.get('/user');
        this.user = result.data;
        console.log('User: ', result.data);
      } catch (error) {
        console.error('Fetch user error: ', error);
      }
    },
    async logout() {
      this.loading = 'logout';
      try {
        await api.post('/logout');
        this.user = null;
        this.loading = false;
      } catch (error) {
        console.error('Logout error: ', error);
        this.loading = false;
      }
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
