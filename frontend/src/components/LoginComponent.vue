<template>
  <q-form @submit.prevent="submit">
    <div>Login</div>
    <q-input outlined v-model="authStore.loginForm.email" type="email" label="Email" label-color="white" />
    <q-input outlined type="password" v-model="authStore.loginForm.password" label="Password" label-color="white" />
    <q-btn type="submit" label="Login" color="primary" />
  </q-form>
  <LoadingIndicator v-if="authStore.loading" message="We are logging you in!" />
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import LoadingIndicator from 'src/components/LoadingIndicator.vue';
const authStore = useAuthStore();

async function submit() {
  await authStore.login();
}

</script>

<style scoped>
div {
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  color: white;
}

.q-input {
  color: white;
}
</style>
