<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>

      </q-list>
    </q-drawer>

    <q-page-container>
      <q-btn label="Test Connection" color="primary" @click="testConnection" />
      <!-- <router-view /> -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';

const leftDrawerOpen = ref(false);

async function testConnection() {
  const response = await api.get('/test');
  console.log('Testing connection', response.data);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.q-drawer {
  background-color: #252525;
}
</style>
