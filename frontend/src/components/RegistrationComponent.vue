<template>
  <q-form @submit.prevent="submit">
    <div>Registration</div>
    <q-input class="first_name" outlined v-model="authStore.registrationForm.first_name" type="text" label="First Name"
      label-color="white" style="color: aliceblue;" />
    <q-input class="last_name" outlined v-model="authStore.registrationForm.last_name" type="text" label="Last Name"
      label-color="white" style="color: aliceblue;" />
    <q-input outlined v-model="authStore.registrationForm.email" type="email" label="Email" label-color="white" />
    <q-input outlined type="password" v-model="authStore.registrationForm.password" label="Password"
      label-color="white" />
    <q-input outlined type="password" v-model="authStore.registrationForm.password_confirmation" label="Repeat Password"
      label-color="white" />
    <q-btn type="submit" label="Register" color="primary" />
  </q-form>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
const authStore = useAuthStore();

async function submit() {
  await authStore.register();
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
