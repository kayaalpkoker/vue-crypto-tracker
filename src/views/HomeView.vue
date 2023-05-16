<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data(){
    return{
      coins:[],
      searchQuery:''
    }
  },
  methods:{

  },
  mounted() {
    axios.get('')
      .then((response) => {
        console.log(response.data.)
        //
      })
  }

}

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
