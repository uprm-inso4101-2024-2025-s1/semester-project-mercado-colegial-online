<template>
  <div class="featured-products">
    <h2 class="title">Featured Products</h2>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-seller">Sold by {{ product.seller }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedProducts",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.featured-products {
  text-align: left;
}

.title {
  color: green;
  font-size: 24px;
  margin-bottom: 40px;
}

.products-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
  justify-content: space-between;
}

.product-card {
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f0f0f0;
}

.product-title {
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
}

.product-price {
  font-size: 16px;
  color: #333;
}

.product-seller {
  font-size: 14px;
  color: #777;
}
</style>
