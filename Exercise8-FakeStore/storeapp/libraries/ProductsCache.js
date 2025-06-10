const axios = require("axios");

class ProductsCache {
    constructor(cacheDurationMs = 5 * 60 * 1000) {
        this.cacheDuration = cacheDurationMs;
        this.products = null;
        this.lastFetchTime = null;
    }

    isCacheValid() {
        if (!this.products || !this.lastFetchTime) return false;
        return Date.now() - this.lastFetchTime < this.cacheDuration;
    }

    async fetchAllProducts() {
        if (this.isCacheValid()) {
            console.log("Serving products from cache");
            return this.products;
        }

        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            this.products = response.data;
            this.lastFetchTime = Date.now();
            console.log("Fetched fresh data from API");
            return this.products;
        } catch (error) {
            throw new Error("Failed to fetch products");
        }
    }

    async fetchProductById(id) {
        const products = await this.fetchAllProducts();
        const product = products.find((product) => product.id === Number(id));

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
}

module.exports = new ProductsCache(); 
