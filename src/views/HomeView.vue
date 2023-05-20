<script>
export default {
  name: 'HomeView',
  data() {
    return {
      coins: [],
      searchQuery: ''
    }
  },
  methods: {
    async getCoins() {
      try {
        const response = await this.$axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1
          }
        });
        this.coins = response.data;
      } catch (error) {
        console.error('Failed to fetch coins:', error);
      }
    },
    async searchCoins() {
      try {
        const response = await this.$axios.get('https://api.coingecko.com/api/v3/search', {
          params: {
            q: this.searchQuery,
            per_page: 50,
            page: 1
          }
        });
        this.coins = response.data;
      } catch (error) {
        console.error('Failed to search coins:', error);
      }
    },
    toCoin(coinId) {
      return `coin/${coinId}`
    },
    formatCurrency(value) {
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
      return formattedValue;
    },
    formatLargeCurrency(value) {
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value);
      return formattedValue;
    },
    formatPercentage(value) {
      return value.toFixed(1) + '%';
    },
    getPercentageClass(value) {
      return value > 0 ? 'text-green' : 'text-red';
    }
  },
  mounted() {
    this.getCoins()
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!--
        <div class="input-group mb-3 text-center">
          <input type="text" class="form-control" v-model="searchQuery" placeholder="<Search function under construction>"
            @input="">
        </div>
        -->
      </div>
    </div>
    <div class="row">
      <h3 class="text-center">Cryptocurrency Rankings by Market Cap</h3>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th class="align-right">Price</th>
              <th class="d-none d-md-table-cell align-right">24h</th>
              <th class="d-none d-lg-table-cell align-right">Low</th>
              <th class="d-none d-lg-table-cell align-right">High</th>
              <th class="d-none d-md-table-cell align-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in coins" :key="coin.id">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="coin.image" alt="Coin Icon" width="30" height="30">&nbsp;
                <RouterLink :to="toCoin(coin.id)">{{ coin.name }}</RouterLink>&nbsp;
                <span class="text-uppercase">{{ coin.symbol }}</span>
              </td>
              <td class="align-right">{{ formatCurrency(coin.current_price) }}</td>
              <td class="d-none d-md-table-cell align-right" :class="getPercentageClass(coin.price_change_percentage_24h)">
                {{ formatPercentage(coin.price_change_percentage_24h) }}
              </td>
              <td class="d-none d-lg-table-cell align-right">{{ formatCurrency(coin.low_24h) }}</td>
              <td class="d-none d-lg-table-cell align-right">{{ formatCurrency(coin.high_24h) }}</td>
              <td class="d-none d-md-table-cell align-right">{{ formatLargeCurrency(coin.market_cap) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>

</style>


<!--
Sample API response:
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  "current_price": 26672,
  "market_cap": 516682635093,
  "market_cap_rank": 1,
  "fully_diluted_valuation": 559953725872,
  "total_volume": 14840872205,
  "high_24h": 27448,
  "low_24h": 26517,
  "price_change_24h": -722.8597876205604,
  "price_change_percentage_24h": -2.63867,
  "market_cap_change_24h": -13689526449.420288,
  "market_cap_change_percentage_24h": -2.58112,
  "circulating_supply": 19377200.0,
  "total_supply": 21000000.0,
  "max_supply": 21000000.0,
  "ath": 69045,
  "ath_change_percentage": -61.38137,
  "ath_date": "2021-11-10T14:24:11.849Z",
  "atl": 67.81,
  "atl_change_percentage": 39222.42358,
  "atl_date": "2013-07-06T00:00:00.000Z",
  "roi": null,
  "last_updated": "2023-05-18T19:43:25.368Z"
-->