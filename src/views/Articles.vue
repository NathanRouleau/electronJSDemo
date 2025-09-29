<template>
  <div class="uk-section uk-background-muted" style="min-height:100vh;">
    <div class="uk-container uk-width-2xlarge">
      <h1 class="uk-heading-line uk-text-center"><span>Liste des articles</span></h1>
      <div v-if="loading" class="uk-text-center uk-margin">
        <div data-uk-spinner></div>
        <span>Chargement...</span>
      </div>
      <div v-if="message" class="uk-alert-primary uk-text-center uk-margin" data-uk-alert>
        {{ message }}
      </div>
      <div class="uk-child-width-1-3@m uk-grid-match uk-grid-small" data-uk-grid>
        <div v-for="article in articles" :key="article.id">
          <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-border-rounded uk-text-center">
            <h3 class="uk-card-title">
              <router-link :to="`/articles/${article.id}`" class="uk-link-heading">{{ article.title }}</router-link>
            </h3>
            <img :src="article.imgPath" alt="Image" class="uk-border-circle uk-align-center" style="max-width:120px;">
            <p class="uk-text-truncate">{{ article.desc }}</p>
            <p class="uk-text-meta"><span uk-icon="user"></span> {{ article.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);
const loading = ref(false);
const message = ref('');

function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.hash = '#/';
  }
}

async function fetchArticles() {
  loading.value = true;
  message.value = '';
  try {
    const res = await fetch('http://localhost:3000/articles');
    const json = await res.json();
    if (json.code === "200") {
      articles.value = json.data;
      message.value = json.message;
    } else {
      message.value = "Erreur lors de la récupération des articles";
    }
  } catch (err) {
    message.value = "Erreur de connexion à l'API";
  }
  loading.value = false;
}

onMounted(() => {
  checkAuth();
  fetchArticles();
});
</script>