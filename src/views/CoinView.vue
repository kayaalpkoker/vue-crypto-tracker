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
    <main v-if="isFetched">
      <div class="row mb-3">
        <div class="col-12 col-lg-6 mb-3">
          <div>
            <p>Rank #{{ coin.market_cap_rank }}</p>
          </div>
          <div>
            <span><img :src="coin.image.small" alt="Coin Icon" width="30" height="30"></span>
            <span>{{ coin.name }}</span>
            <span class="text-uppercase">{{ coin.symbol }}</span>
          </div>
          <div>
            {{ formatCurrency(coin.market_data.current_price.usd) }}
          </div>
          <div :class="getPercentageClass(coin.price_change_percentage_24h)">
            {{ formatPercentage(coin.market_data.price_change_percentage_24h) }}
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div>
            <div class="d-flex justify-content-between">
              <span>Market Cap</span>
              <span class="text-end">{{ formatCurrency(coin.market_data.market_cap.usd) }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Circulating Supply</span>
              <span class="text-end">{{ coin.market_data.circulating_supply }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Total Supply</span>
              <span class="text-end">{{ coin.market_data.total_supply }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Max Supply</span>
              <span class="text-end">{{ coin.market_data.max_supply }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p><strong><em>Insert Chart.js</em></strong></p>
        </div>
      </div>
    </main>
    <div v-else>
      <p v-if="error">Failed to fetch coin information. Please try again.</p>
      <p v-else>Loading coin information...</p>
    </div>
  </div>
</template>
