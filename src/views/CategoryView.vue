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
                this.categories = response.data;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
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
            if (value != null) {
                return value.toFixed(1) + '%';
            }
            return '0.0 %'
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
                            <th class="d-none d-md-table-cell text-end">24h</th>
                            <th class="d-none d-lg-table-cell text-end">Market Cap</th>
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
                            <td class="d-none d-md-table-cell text-end" :class="getPercentageClass(category.market_cap_change_24h)">
                                {{ formatPercentage(category.market_cap_change_24h) }}
                            </td>
                            <td class="d-none d-lg-table-cell text-end">{{ formatCurrency(category.market_cap) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<!--
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
-->