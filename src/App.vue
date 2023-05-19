<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Title from './components/Title.vue'
</script>

<template>
  <header class="container">
    <RouterLink to="/">
      <img alt="NCT logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </RouterLink>

    <div class="row">
      <Title msg="Nomad's Crypto Hub" />
    </div>
    
    <div class="row mb-3">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/categories">Categories (tbd)</RouterLink>
      </nav>
    </div>

  </header>

  <RouterView />

  <footer class="row">
    <p>&copy; 2023 Kaya Alp Köker. All rights reserved.</p>
  </footer>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

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
</style>
