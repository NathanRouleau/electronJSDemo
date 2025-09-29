<template>
  <div class="uk-section uk-padding-remove-top uk-flex uk-flex-center uk-flex-middle uk-background-muted" style="min-height:100vh;">
    <div class="uk-container">
      <h1 class="uk-heading-line uk-text-center uk-margin-medium-bottom"><span>Détail de l'article</span></h1>
      <div v-if="loading" class="uk-text-center uk-margin-medium">
        <div data-uk-spinner="ratio:2"></div>
        <span class="uk-text-lead">Chargement...</span>
      </div>
      <div v-if="message" class="uk-alert-primary uk-text-center uk-margin-small" data-uk-alert>
        {{ message }}
      </div>
      <div v-if="article" class="uk-card uk-card-default uk-card-hover uk-card-body uk-border-rounded uk-flex uk-flex-middle uk-flex-center" style="padding:40px;">
        <div class="uk-flex uk-flex-center uk-flex-middle" style="flex:0 0 300px;">
          <img
            :src="article.imgPath"
            alt="Image"
            class="uk-border-circle"
            style="width:220px; height:220px; object-fit:cover; box-shadow:0 4px 24px rgba(0,0,0,0.12); border-radius:50%;">
        </div>
        <div class="uk-width-expand uk-padding-large">
          <h3 class="uk-card-title uk-text-bold uk-text-primary uk-margin-bottom">{{ article.title }}</h3>
          <p class="uk-text-lead uk-margin-bottom">{{ article.desc }}</p>
          <p class="uk-text-meta uk-margin-bottom"><span uk-icon="user"></span> {{ article.author }}</p>
          <div class="uk-flex uk-flex-center uk-flex-middle" style="gap:12px;">
            <router-link to="/articles" class="uk-button uk-button-primary uk-border-pill" style="min-width:140px; font-size:1.1rem;">
              <span uk-icon="arrow-left"></span>
            </router-link>
            <button class="uk-button uk-button-default uk-border-pill" style="min-width:40px; padding:0 12px;" @click="editMode = !editMode" title="Modifier">
              <span uk-icon="pencil"></span>
            </button>
            <button class="uk-button uk-button-danger uk-border-pill" style="min-width:40px; padding:0 12px;" @click="deleteArticle" title="Supprimer">
              <span uk-icon="trash"></span>
            </button>
          </div>
          <!-- Formulaire de modification -->
          <form v-if="editMode" @submit.prevent="saveArticle" class="uk-margin-top uk-form-stacked uk-width-1-1">
            <div class="uk-margin">
              <label class="uk-form-label">Titre</label>
              <input v-model="edit.title" class="uk-input uk-border-pill" required>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Description</label>
              <textarea v-model="edit.desc" class="uk-textarea uk-border-rounded" required></textarea>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Auteur</label>
              <input v-model="edit.author" class="uk-input uk-border-pill" required>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Image (URL)</label>
              <input v-model="edit.imgPath" class="uk-input uk-border-pill">
            </div>
            <button type="submit" class="uk-button uk-button-success uk-border-pill uk-width-1-1">Enregistrer</button>
            <button type="button" class="uk-button uk-button-default uk-border-pill uk-width-1-1 uk-margin-small-top" @click="editMode = false">Annuler</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const article = ref(null);
const loading = ref(false);
const message = ref('');
const route = useRoute();
const router = useRouter();

const editMode = ref(false);
const edit = ref({
  title: '',
  desc: '',
  author: '',
  imgPath: ''
});

async function fetchArticle() {
  loading.value = true;
  message.value = '';
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`);
    const json = await res.json();
    if (json.code === "200") {
      article.value = json.data;
      message.value = json.message;
      edit.value = {
        title: json.data.title,
        desc: json.data.desc,
        author: json.data.author,
        imgPath: json.data.imgPath
      };
    } else {
      message.value = "Erreur lors de la récupération de l'article";
    }
  } catch (err) {
    message.value = "Erreur de connexion à l'API";
  }
  loading.value = false;
}

async function saveArticle() {
  message.value = 'Enregistrement...';
  try {
    const res = await fetch('http://localhost:3000/articles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: route.params.id,
        ...edit.value
      })
    });
    const json = await res.json();
    if (json.code === "200") {
      article.value = json.data;
      message.value = json.message;
      editMode.value = false;
    } else {
      message.value = "Erreur lors de la modification";
    }
  } catch (err) {
    message.value = "Erreur de connexion à l'API";
  }
}

async function deleteArticle() {
  if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
  message.value = 'Suppression...';
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.code === "200") {
      message.value = json.message;
      setTimeout(() => {
        router.push('/articles');
      }, 1000);
    } else {
      message.value = "Erreur lors de la suppression";
    }
  } catch (err) {
    message.value = "Erreur de connexion à l'API";
  }
}

onMounted(fetchArticle);
</script>