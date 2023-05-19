<script>
import axios from 'axios';

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
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1
          }
        });
        const data = response.data;
        this.coins = data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          marketCap: coin.market_cap
        }));
      } catch (error) {
        console.error('Failed to fetch coins:', error);
      }
    },
    async searchCoins() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search', {
          params: {
            q: this.searchQuery,
            per_page: 100,
            page: 1
          }
        });
        const data = response.data;
        this.coins = data.coins.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          marketCap: coin.market_cap
        }));
      } catch (error) {
        console.error('Failed to search coins:', error);
      }
    }
  },
  computed: {
    filteredCoins() {
      if (this.searchQuery) {
        return this.coins.filter((coin) =>
          coin.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.coins;
      }
    }
  },
  mounted() {
    this.getCoins()
  }
}
</script>

<template>
  <div class="home">
    <input type="text" v-model="searchQuery" placeholder="Search" @input="searchCoins">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in coins" :key="coin.id">
          <td>{{ index+1 }}</td>
          <td>{{ coin.name }}</td>
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.marketCap }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
