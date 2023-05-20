<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Title from './components/Title.vue'
</script>

<template>
  <div class="container">
    <header class="text-center">
      
      <div class="row">
        <RouterLink to="/">
          <img alt="NCH logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
      </div>
      
      <div class="row">
        <Title msg="Nomad Crypto Hub" />
      </div>

      <div class="row mb-3">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
        </nav>
      </div>
    </header>

    <main class="row">
      <RouterView />
    </main>

    <footer class="">
      <p>&copy; 2023 Kaya Alp Köker. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
*/
</style>
