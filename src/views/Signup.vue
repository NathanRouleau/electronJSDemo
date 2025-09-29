<template>
  <body class="uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-large uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <img src="../../assets/img/login-logo.svg" alt="Logo">
      </div>
      <form @submit.prevent="signup" class="toggle-class">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="email">
          </div>
          <div class="uk-margin-small">
            <input v-model="password" class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password">
          </div>
          <div class="uk-margin-small">
            <input v-model="passwordConfirm" class="uk-input uk-border-pill" required placeholder="Confirmer le mot de passe" type="password">
          </div>
          <div class="uk-margin-small">
            <input v-model="pseudo" class="uk-input uk-border-pill" required placeholder="Pseudo" type="text">
          </div>
          <div class="uk-margin-small">
            <input v-model="cityCode" class="uk-input uk-border-pill" required placeholder="Code postal" type="text">
          </div>
          <div class="uk-margin-small">
            <input v-model="city" class="uk-input uk-border-pill" required placeholder="Ville" type="text">
          </div>
          <div class="uk-margin-small">
            <input v-model="phone" class="uk-input uk-border-pill" required placeholder="Téléphone" type="text">
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">S'inscrire</button>
          </div>
          <div v-if="message" class="uk-alert-primary uk-text-center uk-margin" data-uk-alert>
            {{ message }}
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center uk-margin">
        <router-link to="/" class="uk-button uk-button-default uk-border-pill uk-width-1-1">Déjà inscrit ? Se connecter</router-link>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const pseudo = ref('');
const cityCode = ref('');
const city = ref('');
const phone = ref('');
const message = ref('');

async function signup() {
  message.value = 'Chargement...';
  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        pseudo: pseudo.value,
        cityCode: cityCode.value,
        city: city.value,
        phone: phone.value
      })
    });
    const data = await res.json();
    message.value = data.message;
    if (data.code === "200") {
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    }
  } catch (err) {
    message.value = "Erreur lors de l'inscription";
  }
}
</script>