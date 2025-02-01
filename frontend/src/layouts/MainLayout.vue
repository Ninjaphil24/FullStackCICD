<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="!leftDrawerOpen" color="secondary" :label="authStore.isLoggedIn ? 'Logout' : 'Login'"
          @click="authStore.isLoggedIn ? authStore.logout() : toggleLeftDrawer()" data-cy="login-button" />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn color="primary" label="Home" to="/" />
        <q-btn v-if="authStore.isLoggedIn" color="primary" label="Dashboard" to="/dashboard" />

      </q-toolbar>
    </q-header>

    <q-drawer v-if="!authStore.isLoggedIn" v-model="leftDrawerOpen" bordered>
      <q-btn-group>
        <q-btn color="secondary" glossy label="Login" @click="selectComponent('login')" />
        <q-btn color="secondary" glossy label="Register" @click="selectComponent('register')" />
        <q-btn color="red" glossy icon="close" @click="toggleLeftDrawer()" data-cy="close-button" />
      </q-btn-group>

      <q-list>
        <LoginComponent v-if="selectedComponent === 'login'" />
        <RegistrationComponent v-else-if="selectedComponent === 'register'" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="main" v-if="!authStore.isLoggedIn">Please log in for content</div>
      <div class="main" v-else-if="authStore.isLoggedIn">Hello, {{ authStore.user?.name }}</div>
      <router-view />

      <LoadingIndicator v-if="authStore.loading"
        :message="authStore.loading === 'initialize' ? 'Checking user...' : authStore.loading === 'registration' ? 'We are registering you and logging you in...' : authStore.loading === 'login' ? 'We are logging you in...' : 'We are logging you out.'" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import RegistrationComponent from 'src/components/RegistrationComponent.vue';
import LoginComponent from 'src/components/LoginComponent.vue';
import { useAuthStore } from 'src/stores/auth';
import LoadingIndicator from 'src/components/LoadingIndicator.vue';

const authStore = useAuthStore();

const selectedComponent = ref('login');
const leftDrawerOpen = ref(false);

watch(() => authStore.isLoggedIn, (newVal) => {
  if (newVal) {
    leftDrawerOpen.value = false;
  }
});

function selectComponent(component: string) {
  selectedComponent.value = component;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.q-drawer {
  background-color: #787777;
}

.main {
  color: white;
}
</style>
