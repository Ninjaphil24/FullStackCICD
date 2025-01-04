<template>
  <div>
    <q-spinner-dots color="primary" size="4em" />
    <p>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
//
import { defineProps } from 'vue';

const props = defineProps<{
  message: string;
}>();
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
