import { defineBoot } from '@quasar/app-vite/wrappers';
import { useAuthStore } from 'src/stores/auth';

export default defineBoot(() => {
  const authStore = useAuthStore();
  authStore.initialize(); // Initialize the auth store
});
