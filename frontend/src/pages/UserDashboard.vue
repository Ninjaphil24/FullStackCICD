<template>
  <q-page padding>
    Dashboard
    <div>Name: {{ authStore.user.name }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

</script>
