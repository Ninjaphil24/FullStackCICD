<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn color="secondary" label="Login" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-btn-group>
        <q-btn color="secondary" glossy label="Login" @click="selectComponent('login')" />
        <q-btn color="secondary" glossy label="Register" @click="selectComponent('register')" />
      </q-btn-group>

      <q-list>
        <LoginComponent v-if="selectedComponent === 'login'" />
        <RegistrationComponent v-else-if="selectedComponent === 'register'" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegistrationComponent from 'src/components/RegistrationComponent.vue';
import LoginComponent from 'src/components/LoginComponent.vue';

const selectedComponent = ref('login');
const leftDrawerOpen = ref(false);

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
</style>
