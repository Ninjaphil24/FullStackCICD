import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Global Router Guard
  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const { isLoggedIn } = storeToRefs(authStore); // Make it reactive

    // Ensure user info is loaded before checking authentication
    if (!authStore.user) {
      await authStore.fetchUser(); // Fetch user from Laravel if not already loaded
    }

    if (to.meta.requiresAuth && !isLoggedIn.value) {
      next('/'); // Redirect to home page if not authenticated
    } else {
      next(); // Allow access
    }
  });

  return Router;
});
