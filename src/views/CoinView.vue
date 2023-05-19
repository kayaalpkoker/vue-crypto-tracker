<script>
export default {
  name: 'CoinView',
  data() {
    return {
      coin: {},
      isFetched: false,
      error: false
    }
  },
  methods: {
    async getCoin() {
      try {
        const response = await this.$axios.get(`https://api.coingecko.com/api/v3/coins/${this.$route.params.id}`);
        /*
        Sample API response:
        */
        this.coin = response.data;
        this.isFetched = true;
      } catch (error) {
        console.error('Failed to fetch coin:', error);
        this.error = true;
      }
    },
    formatCurrency(value) {
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
      return formattedValue;
    },
    formatPercentage(value) {
      if (typeof value === 'number') {
        return value.toFixed(1) + '%';
      }
      return '';
    },
    getPercentageClass(value) {
      return value > 0 ? 'text-green' : 'text-red';
    }
  },
  mounted() {
    this.getCoin().catch(error => {
      console.error('Failed to fetch coin:', error);
      this.error = true;
    });
  }
}
</script>


<template>
  <div class="container">
    <div v-if="isFetched">
      <h1>{{ coin.name }}</h1>
      <!-- Display other coin information here -->
      <p>Price: {{ formatCurrency(coin.market_data.current_price.usd) }}</p>
      <p>24h Change: <span :class="getPercentageClass(coin.price_change_percentage_24h)">{{
        formatPercentage(coin.price_change_percentage_24h) }}</span></p>
      <!-- Add more properties as needed -->
    </div>
    <div v-else>
      <p v-if="error">Failed to fetch coin information. Please try again.</p>
      <p v-else>Loading coin information...</p>
    </div>
  </div>
</template>