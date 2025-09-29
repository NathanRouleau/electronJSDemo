<template>
  <!--  Navigation-->
  <ul uk-tab>
    <li v-if="!isLoggedIn">
      <router-link to="/">Login</router-link>
    </li>
    <li class="uk-active">
      <router-link to="/articles">Liste des articles</router-link>
    </li>
    <li v-if="isLoggedIn">
      <a href="#" @click="logout">Deconnexion</a>
    </li>
  </ul>

  <!-- Fonctionnement Vue pour en temps remplacer la page activer -->
  <router-view/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = ref(!!localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.replace('/')
}

onMounted(() => {
  window.addEventListener('auth-change', () => {
    isLoggedIn.value = !!localStorage.getItem('token');
  });
});
</script>