<template>
  <div>
    <q-spinner-dots color="primary" size="10em" />
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.7);
  z-index: 9999;
}
</style>
