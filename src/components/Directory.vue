<template>
  <div class="directory-container">
    <h1>Directory</h1>
    <div class="menu">
      <router-link to="/seating-chart" class="menu-item">Seating Chart</router-link>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userRole'])
  }
};
</script>

<style scoped>
.directory-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-decoration: none;
  color: #007bff;
  background-color: #f8f9fa;
}

.menu-item:hover {
  background-color: #e2e6ea;
}
</style>
