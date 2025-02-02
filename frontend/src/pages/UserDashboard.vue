<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="updateUser">
          <q-input v-model="user.first_name" label="First Name" />
          <q-input v-model="user.last_name" label="Last Name" />
          <q-btn type="submit" label="Update" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
    <div>Name: {{ user.first_name }} {{ user.last_name }}</div>
    <q-btn label="Delete" color="negative" @click="deleteUser" />

  </q-page>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({
  id: 0,
  first_name: '',
  last_name: '',
});


onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser();
  }
  Object.assign(user, authStore.user);
});

async function updateUser() {
  try {
    await api.put(`/users/${user.id}`, {
      first_name: user.first_name,
      last_name: user.last_name,
    });
    console.log('User updated successfully');
  } catch (error) {
    console.error('Failed to update user:', error);
  }
}

async function deleteUser() {
  try {
    await api.delete(`/users/${user.id}`);
    console.log('User deleted successfully');
    router.push('/');
    window.location.reload();
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
}

</script>
