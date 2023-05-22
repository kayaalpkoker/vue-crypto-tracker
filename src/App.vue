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
