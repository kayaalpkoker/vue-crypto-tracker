<script>
export default {
    name: 'CategoryView',
    data() {
        return {
            categories: [],
        }
    },
    methods: {
        async getCategories() {
            try {
                const response = await this.$axios.get('https://api.coingecko.com/api/v3/coins/categories', {
                    params: {
                        order: 'market_cap_desc',
                    }
                });
                this.coins = response.data;
                /*
                Sample API response:
                    "id": "layer-1",
                    "name": "Layer 1 (L1)",
                    "market_cap": 836966646668.0885,
                    "market_cap_change_24h": -1.609612807492597,
                    "content": "",
                    "top_3_coins": [
                    "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
                    "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
                    "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850"
                    ],
                    "volume_24h": 13285075589.563087,
                    "updated_at": "2023-05-19T21:10:25.723Z"
                */
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        },
        formatPercentage(value) {
            return value.toFixed(1) + '%';
        },
        getPercentageClass(value) {
            return value > 0 ? 'text-green' : 'text-red';
        }
    },
    mounted() {
        this.getCategories()
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <h3 class="text-center">Top Crypto Categories by Market Cap</h3>
        </div>
        <div class="row">
            <div class="col-12 mb-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Top Gainers</th>
                            <th>24h</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in categories" :key="category.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td>
                                <img :src="category.top_3_coins[0]" alt="" width="30" height="30">
                                <img :src="category.top_3_coins[1]" alt="" width="30" height="30">
                                <img :src="category.top_3_coins[2]" alt="" width="30" height="30">
                            </td>
                            <td :class="getPercentageClass(category.market_cap_change_24h)">
                                {{ formatPercentage(category.market_cap_change_24h) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }

    .text-green {
        color: green;
    }

    .text-red {
        color: red;
    }
}
</style>
