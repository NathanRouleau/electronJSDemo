const API_URL = 'http://localhost:3000';

export default {
  async login(email, password) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(res => res.json());
  },

  async signup(payload) {
    return fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json());
  },

  async getArticles() {
    return fetch(`${API_URL}/articles`).then(res => res.json());
  },
  async getArticle(id) {
    return fetch(`${API_URL}/articles/${id}`).then(res => res.json());
  },

  async saveArticle(article) {
    return fetch(`${API_URL}/articles/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    }).then(res => res.json());
  },
  
  async deleteArticle(id) {
    return fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
  }
};