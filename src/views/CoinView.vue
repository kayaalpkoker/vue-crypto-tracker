<script>
import axios from 'axios';

export default {
  name: 'CoinView',
  data() {
    return {
      coin: {},
      //
    }
  },
  mounted() {
    axios.get('')
      .then((response) => {
        console.log(response.data)
        //
      })
  }
}
</script>


<template>
  <div class="container">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
