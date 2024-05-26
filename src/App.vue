<template>
  <div id="app">
    <nav>
      <router-link to="/directory">Home</router-link>
      <router-link to="/seating-chart">Seating Chart</router-link>
      <router-link to="/upload">Upload Seating Chart</router-link>
      <router-link v-if="!isAuthenticated" to="/auth">Login/Register</router-link>
      <router-link v-if="isAuthenticated" @click.native="logout">Logout</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
  }
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>
