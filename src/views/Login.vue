<template>
  <body class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <!-- overlay -->
    <div class="uk-position-cover uk-overlay-primary"></div>
    <!-- /overlay -->
    <div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
      <span class="uk-text-small uk-text-muted">© 2019 Company Name - ...</span>
    </div>
    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <img src="../../assets/img/login-logo.svg" alt="Logo">
      </div>
      <!-- login -->
      <form @submit.prevent="login" class="toggle-class">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="text">
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Password" type="password">
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">LOG IN</button>
          </div>
          <div v-if="message" class="uk-alert-primary uk-text-center uk-margin" data-uk-alert>
            {{ message }}
          </div>
        </fieldset>
      </form>
     <div class="uk-text-center uk-margin">
        <router-link to="/signup" class="uk-button uk-button-default uk-border-pill uk-width-1-1">
            S'inscrire
        </router-link>
        </div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const email = ref('');
const password = ref('');
const message = ref('');

async function login() {
  message.value = 'Chargement...';
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    const data = await res.json();
    message.value = data.message;

    if (data.code === "200" && data.data) {
      localStorage.setItem('token', data.data);
      window.dispatchEvent(new Event('auth-change'));
      window.location.hash = '#/articles';
    }
  } catch (err) {
    message.value = "Erreur de connexion";
  }
}
</script>